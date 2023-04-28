import dbConnect from "@/lib/dbConnect";
import Pet from "@/models/Pet";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const petId = params.petId;

  await dbConnect();

  try {
    const pet = await Pet.findById(petId);
    const { password, ...other } = pet._doc;
    return new NextResponse(JSON.stringify({ pet: other }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
