import bcrypt from "bcrypt";
import Pet from "@/models/Pet";
import { signToken } from "@/lib/signToken";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  await dbConnect();

  try {
    const pet = await Pet.findOne({ email: body.email });

    // Code 404 - Not Found
    if (!pet)
      return new NextResponse(JSON.stringify({ message: "Pet not found!" }), { status: 404 });

    // Check if password is correct
    const validPassword = await bcrypt.compare(body.password, pet._doc.password);

    // Code 401 - Unauthorized
    if (!validPassword) return new NextResponse(null, { status: 401 });

    // Calls function that tokenizes the user data
    const token = signToken(pet._doc);

    // Code 200 - Ok
    return new NextResponse(JSON.stringify({ token }), {
      status: 200,
      headers: { "Set-Cookie": `token=${token}; Path=/; Max-Age=3600; SameSite=Strict; Secure` },
    });
  } catch (err) {
    console.error(err);
    return new NextResponse.json(err);
  }
}
