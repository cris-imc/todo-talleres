import { getPayloadClient } from '../src/lib/payload'

async function updateNewsContent() {
  const payload = await getPayloadClient()
  
  const content = [
    {
      children: [{ text: 'Talleres 2 - Instituto 0' }],
      type: 'h3',
    },
    {
      children: [{ text: 'Fecha 10 del Torneo Apertura 2026 - Estadio Mario Alberto Kempes - 12 de marzo de 2026' }],
      type: 'p',
    },
    {
      children: [{ text: 'El clásico cordobés fue para la "T". Con goles de Valentin Davila en el primer tiempo y Rick Lima Morais en el tiempo de descuento, Talleres venció 2-0 a Instituto en el estadio Mario Alberto Kempes y escala posiciones en el Torneo Apertura 2026.' }],
      type: 'p',
    },
    {
      children: [{ text: 'EL PRIMER GOL' }],
      type: 'h4',
    },
    {
      children: [{ text: 'A los 31 minutos del primer tiempo, Alexandro Maidana impactó de cabeza un centro y el balón golpeó en el travesaño. El rebote quedó para Valentin Davila, quien de zurda empujó el balón al fondo de la red para el 1-0 albiazul.' }],
      type: 'p',
    },
    {
      children: [{ text: 'EL SEGUNDO GOL' }],
      type: 'h4',
    },
    {
      children: [{ text: 'En el minuto 47 del segundo tiempo, en tiempo de descuento, la "T" salió en contraataque devastador. Rick Lima Morais recibió el balón en campo rival y con un potente derechazo cruzado sentenció el 2-0 definitivo.' }],
      type: 'p',
    },
    {
      children: [{ text: 'GUIDO HERRERA, LA FIGURA' }],
      type: 'h4',
    },
    {
      children: [{ text: 'Instituto generó muchas situaciones de gol a lo largo del encuentro, con 17 remates y 47% de posesión de pelota. Sin embargo, el arquero Guido Herrera fue el muro albiazul, atajando 5 disparos de los dirigidos por el banco rival. Santiago Fernandez también fue clave con 7 pelotas despejadas desde el area.' }],
      type: 'p',
    },
    {
      children: [{ text: 'CON ESTE RESULTADO' }],
      type: 'h4',
    },
    {
      children: [{ text: 'Talleres sumó 3 puntos vitales y se ubica en el 6to lugar de la Zona A del Torneo Apertura 2026 con 14 unidades. El próximo compromiso de la "T" será el 15 de marzo ante Belgrano en condición de visitante.' }],
      type: 'p',
    }
  ]

  // Updating the latest post with the slug we know
  const { docs } = await payload.find({
    collection: 'noticias',
    where: { slug: { equals: 'talleres-vence-instituto-clasico-2-0' } }
  })
  
  if (docs.length > 0) {
    const doc = docs[0]
    console.log(`Updating document ID: ${doc.id}`)
    
    await payload.update({
      collection: 'noticias',
      id: doc.id,
      data: {
        contenido: content
      }
    })
    console.log('Update complete!')
  } else {
    console.log('Article not found!')
  }
  
  process.exit(0)
}

updateNewsContent().catch(e => {
  console.error(e)
  process.exit(1)
})
