"use client"
import { Acooirdion } from "./components/acordionFaqs"

export default function FaqsPage () {
    return (
        <div className="max-w-4xl mx-auto bg-background shadow-md rounded-lg p-6">
            <h2 className="text-3xl mb-8">FAQS</h2>
            <div className="mb-5">
                <p className="font-bold">¿Qué es este sitio web?</p>
                <p>Este sitio web es una plataforma diseñada para brindar información útil, productos o servicios relacionados con nuestras áreas de especialización.</p>
            </div>
            <div className="mb-5">
                <p className="font-bold">¿Cómo puedo contactar con soporte?</p>
                <p>Puedes ponerte en contacto con nuestro equipo de soporte a través del formulario de contacto en la sección "Contacto" o enviándonos un correo a soporte@example.com.</p>
            </div>
            <div className="mb-5">
                <p className="font-bold">¿Cuáles son los métodos de pago aceptados?</p>
                <p>Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias. Los métodos específicos pueden variar según tu ubicación.</p>
            </div>
            <div className="mb-5">
                <p className="font-bold">¿Cuánto tiempo tardan en procesar un pedido?</p>
                <p>Procesamos los pedidos dentro de las 24 a 48 horas hábiles posteriores a la confirmación del pago.</p>
            </div>
            <div className="mb-5">
                <p className="font-bold">¿Puedo cancelar o modificar mi pedido?</p>
                <p>Sí, puedes cancelar o modificar tu pedido dentro de las primeras 12 horas después de realizarlo. Contáctanos lo antes posible para gestionar tu solicitud.</p>
            </div>
            <div className="mb-5">
                <p className="font-bold">¿Ofrecen reembolsos?</p>
                <p>Sí, ofrecemos reembolsos en casos específicos. Por favor, consulta nuestra política de devoluciones para más detalles.</p>
            </div>
            <Acooirdion/>
        </div>
    )
}
