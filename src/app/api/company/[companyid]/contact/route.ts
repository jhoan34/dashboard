import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        // Obtener el companyId de la URL
        const url = new URL(req.url);
        const idparacontact = url.pathname.split("/")[3]; // Asegúrate de que el ID esté en la posición correcta
        console.log("idparacontact:", idparacontact);

        // Verificar si el ID está presente
        if (!idparacontact) {
            return new NextResponse("Company ID is required in URL", { status: 400 });
        }

        // Obtener los datos del cuerpo de la solicitud
        const data = await req.json();

        // Verificar si los datos no están vacíos
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
            return new NextResponse("Request body is required and must be an object", { status: 400 });
        }

        // Agregar un log para verificar los datos recibidos
        console.log("Data received:", data);

        // Verificar si el usuario está autenticado
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Buscar la empresa en la base de datos
        const company = await db.company.findUnique({
            where: {
                id: idparacontact,
            }
        });

        // Verificar si la empresa existe
        if (!company) {
            return new NextResponse("Company not found", { status: 404 });
        }

        // Crear el contacto asociado a la empresa
        const contact = await db.contact.create({
            data: {
                companyId: idparacontact,
                ...data, // Los datos del contacto enviados en el cuerpo de la solicitud
            }
        });

        // Verificar si el contacto se creó correctamente
        if (!contact) {
            return new NextResponse("Contact not created", { status: 400 });
        }

        // Devolver la respuesta con el contacto creado
        return NextResponse.json(contact);
    } catch (error) {
        // Si el er es un objeto, puedes enviar un mensaje detallado
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        console.error("Error message:", errorMessage);
        // Mejor manejo del error
        return new NextResponse(`Internal Server Error: ${errorMessage}`, { status: 500 });
    }
}
