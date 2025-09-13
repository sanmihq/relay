"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import bcrypt from "bcryptjs";
import { generateShortId } from "./utils/short-id";

// Supabase client for authenticated access (via service role key)
const createAdminClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies();
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
};

// Supabase client for public read access (via anon key)
const createPublicClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async get(name: string) {
          const cookieStore = await cookies();
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
};

// ** NEW ACTION: Validates a password and sets a cookie **
export async function validateAndSetCookie(roomId: string, password: string) {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("password")
    .eq("id", roomId)
    .maybeSingle();

  if (error || !data || data.password === null) {
    // Room not found or not password-protected
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, data.password);

  if (isPasswordValid) {
    // Set a cookie that indicates the user has unlocked this room.
    const cookieStore = await cookies();
    cookieStore.set(`room_${roomId}`, "unlocked", {
      httpOnly: true, // Prevents client-side JavaScript access
      secure: process.env.NODE_ENV === "production",
      path: `/room/${roomId}`, // Cookie is only valid for this specific room
      maxAge: 60 * 60 * 24, // 1 day
    });
    return true;
  }
  return false;
}

// ** UPDATED: `getRoomValidationStatus` **
export async function getRoomValidationStatus(roomId: string) {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("password")
    .eq("id", roomId)
    .maybeSingle();

  // Case 1: Room not found
  if (error || !data) {
    return { found: false, needsPassword: false, passwordValid: false };
  }

  // Case 2: Room exists, is public (no password)
  if (data.password === null) {
    return { found: true, needsPassword: false, passwordValid: true };
  }

  // Case 3: Room exists and needs a password.
  // Check if the unlock cookie exists.
  const cookieStore = await cookies();
  const isUnlocked = cookieStore.get(`room_${roomId}`)?.value === "unlocked";
  if (isUnlocked) {
    return { found: true, needsPassword: true, passwordValid: true };
  }

  // If no cookie, we need to prompt for the password.
  return { found: true, needsPassword: true, passwordValid: false };
}

/**
 * Creates a new room with a unique ID and an optional hashed password.
 */
export async function createRoom(name: string, password?: string | null) {
  const supabase = createAdminClient();
  let hashedPassword = null;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  let roomId = null;
  let attempts = 0;
  const maxAttempts = 5;

  while (!roomId && attempts < maxAttempts) {
    const newId = generateShortId();
    const { data, error } = await supabase
      .from("rooms")
      .insert({
        id: newId,
        name,
        password: hashedPassword,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation (ID collision)
        console.warn(`ID collision detected, retrying... (${newId})`);
        attempts++;
      } else {
        throw new Error("Failed to create room due to a database error.");
      }
    } else if (data) {
      roomId = data.id;
    }
  }

  if (!roomId) {
    throw new Error("Failed to create room after multiple attempts.");
  }

  return roomId;
}
