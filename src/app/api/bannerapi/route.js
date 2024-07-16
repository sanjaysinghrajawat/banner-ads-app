import { NextResponse } from "next/server";

export async function POST(request) {

    const { startDate, endDate, weight, url, bannerAmount, imageUrl } = await request.json();
    

    console.log(startDate)
    console.log(endDate)
    console.log(weight)
    console.log(url)
    console.log(bannerAmount)
    console.log(imageUrl)
    return NextResponse.json({message: "Data Recevied"})
}
