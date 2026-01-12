import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Invalid email format" },
                { status: 400 }
            );
        }

        // Here you can add your email sending logic or database storage
        // For now, we'll just log it and return success
        console.log("Contact form submission:", { name, email, message });

        // TODO: Integrate with email service (e.g., Resend, SendGrid, Nodemailer)
        // or store in a database (MongoDB, PostgreSQL, etc.)

        return NextResponse.json(
            { success: true, message: "Message received! I'll get back to you soon." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
