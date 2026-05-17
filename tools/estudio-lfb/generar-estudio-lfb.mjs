import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../..");
const referenceHtmlPath = path.join(__dirname, "assets/leccion_86_jesus_resucita_lazaro.html");
const outputDir = path.join(rootDir, "public/estudios-lfb");

const study = {
  slug: "lfb-86-seccion-13-87",
  title: "Lección 86, sección 13 y lección 87",
  eyebrow: "Lecciones que aprendo de la Biblia",
  roman: "lxxxvi · xiii · lxxxvii",
  subtitle: "Estudio completo basado en el PDF: lección 86, introducción a la sección 13 y lección 87, con preguntas del libro y respuestas listas para dirigir.",
  meta: [
    "Juan 11:1-53",
    "PDF págs. 200-205",
    "Sección 13",
    "Lección 87",
    "30 minutos",
  ],
  nav: [
    ["situarte", "i", "📍", "Para situarte"],
    ["secuencia", "ii", "🕰️", "La secuencia de los hechos"],
    ["historia", "iii", "📖", "La historia relatada"],
    ["preguntas", "iv", "❓", "Preguntas del libro"],
    ["meditar", "v", "✍️", "Preguntas para meditar"],
    ["texto", "vi", "🕊️", "El texto clave"],
    ["principio", "vii", "💎", "El principio que ilumina la escena"],
    ["entonces", "viii", "⚖️", "Entonces y ahora"],
    ["lecciones", "ix", "🔑", "Lecciones que se desprenden del texto"],
    ["aplicacion", "x", "💡", "Aplicación personal"],
    ["jehova", "xi", "☁️", "Lo que aprendemos de Jehová"],
    ["conexion", "xii", "🔗", "Conexión con lecciones cercanas"],
    ["textos", "xiii", "🔍", "Explicación de los textos bíblicos"],
  ],
};

const extraStyle = `
    .lesson-block{
      margin:30px 0;
      padding:24px;
      border-radius:24px;
      border:1px solid rgba(176,132,66,.55);
      border-top:8px solid var(--gold);
      background:linear-gradient(180deg, rgba(255,255,255,.62), rgba(244,237,224,.74));
      box-shadow:0 18px 38px rgba(42,36,28,.08);
    }
    .lesson-block:first-of-type{margin-top:0;}
    .lesson-block.lesson-section{
      border-top-color:var(--forest);
      background:linear-gradient(180deg, rgba(239,224,189,.58), rgba(251,246,236,.82));
    }
    .lesson-kicker{
      display:inline-flex;
      align-items:center;
      margin-bottom:12px;
      border-radius:999px;
      padding:5px 12px;
      background:var(--forest);
      color:#fff;
      font-size:.72rem;
      font-weight:900;
      letter-spacing:.16em;
      text-transform:uppercase;
    }
    .lesson-section .lesson-kicker{background:var(--burgundy);}
    .lesson-block h3{
      margin-top:0;
      padding-bottom:10px;
      border-bottom:1px solid rgba(176,132,66,.42);
    }
    .lesson-meta-row{
      display:flex;
      flex-wrap:wrap;
      gap:8px;
      margin:0 0 18px;
    }
    .lesson-meta-row span{
      border:1px solid rgba(176,132,66,.38);
      border-radius:999px;
      padding:4px 10px;
      background:rgba(255,255,255,.45);
      color:var(--muted);
      font-size:.8rem;
      font-weight:800;
    }
    .study-part{
      margin:18px 0 0;
      padding:16px;
      border:1px solid rgba(47,74,58,.14);
      border-radius:18px;
      background:rgba(255,250,241,.58);
    }
    .study-part h4{
      margin:0 0 9px;
      color:var(--forest);
      font-family:Inter, sans-serif;
      font-size:.84rem;
      font-weight:900;
      letter-spacing:.13em;
      text-transform:uppercase;
    }
    .study-part h5{
      margin:18px 0 8px;
      color:var(--burgundy);
      font-family:Fraunces, serif;
      font-size:1.16rem;
    }
    .study-list{
      display:grid;
      gap:8px;
      padding:0;
      margin:0;
      list-style:none;
    }
    .study-list li{
      position:relative;
      padding-left:18px;
      color:#4a4035;
    }
    .study-list li:before{
      content:"";
      position:absolute;
      left:0;
      top:.72em;
      width:7px;
      height:7px;
      border-radius:50%;
      background:var(--gold);
    }
    .lesson-qa{
      display:grid;
      gap:10px;
    }
    .lesson-qa article{
      padding:12px;
      border-left:4px solid var(--gold);
      border-radius:0 14px 14px 0;
      background:rgba(239,224,189,.32);
    }
    .lesson-qa strong{
      display:block;
      color:var(--burgundy);
      margin-bottom:4px;
    }
    .lesson-qa p{
      margin:0;
    }
    .lesson-block p:first-of-type:first-letter{
      float:none;
      font-size:inherit;
      line-height:inherit;
      padding:0;
      color:inherit;
      font-weight:inherit;
    }
    @media (max-width:700px){
      .lesson-block{
        padding:18px 15px;
        margin:24px 0;
        border-radius:18px;
      }
    }
`;

const e = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const p = (items) => items.map((item) => `<p>${e(item)}</p>`).join("\n");

const card = ({ title, subtitle, body }) => `
  <div class="card">
    <strong>${e(title)}</strong>
    ${subtitle ? `<em>${e(subtitle)}</em>` : ""}
    ${p(Array.isArray(body) ? body : [body])}
  </div>`;

const details = ({ title, body }) => `
  <details>
    <summary>✦ ${e(title)}</summary>
    <div class="detail-body">${p(Array.isArray(body) ? body : [body])}</div>
  </details>`;

const sectionTitle = (id) => {
  const [, roman, icon, title] = study.nav.find(([sectionId]) => sectionId === id);
  return `<div class="section-title"><div class="topline"><em>${roman}</em> · ${icon}</div><h2>${e(title)}</h2><div class="gold-line"></div></div>`;
};

const lessonStudies = [
  {
    id: "leccion-86",
    label: "Lección 86",
    title: "Jesús resucita a Lázaro",
    meta: ["Juan 11:1-53", "PDF págs. 200-201", "Esperanza de la resurrección"],
    situarte: {
      when: "Betania, poco antes de la última Pascua de Jesús.",
      intro: [
        "La lección muestra a Jesús frente a la muerte de un amigo amado. No es solo un relato de poder; también es un relato de ternura, fe y esperanza.",
        "Sirve para ayudar a la congregación a confiar en Jehová cuando una situación parece imposible.",
      ],
      characters: [
        { title: "Jesús", subtitle: "El Hijo de Dios y amigo fiel", body: "Muestra compasión real y, con el poder que Jehová le da, resucita a Lázaro." },
        { title: "Lázaro", subtitle: "Amigo de Jesús", body: "Su muerte abre una escena que revela la esperanza de la resurrección de manera inolvidable." },
        { title: "Marta", subtitle: "Mujer de fe activa", body: "Corre al encuentro de Jesús y expresa confianza en la resurrección." },
        { title: "María", subtitle: "Hermana de Lázaro", body: "Llega llorando a los pies de Jesús; su dolor conmueve profundamente al Maestro." },
        { title: "Los discípulos", subtitle: "Testigos del poder de Jesús", body: "Acompañan a Jesús aunque el viaje a Judea puede ser peligroso." },
        { title: "Los fariseos", subtitle: "Opositores endurecidos", body: "Al enterarse del milagro, algunos no reaccionan con fe; buscan matar a Jesús." },
      ],
      scenario: [
        "Lázaro está enfermo y sus hermanas piden ayuda.",
        "Jesús no llega de inmediato, pero su espera permite que todos vean algo más grande.",
        "Cuando Jesús llega, ya hay duelo, lágrimas y una tumba cerrada.",
      ],
    },
    sequence: [
      ["Mensaje urgente", "María y Marta avisan que Lázaro está muy enfermo."],
      ["Espera de Jesús", "Jesús no va de inmediato; permite que la situación revele algo más grande."],
      ["Llegada a Betania", "Jesús consuela a Marta y María, y se conmueve ante el dolor de todos."],
      ["Resurrección de Lázaro", "Jesús ora a Jehová, llama a Lázaro y él sale vivo de la tumba."],
      ["Oposición más fuerte", "Muchos creen, pero los líderes religiosos planean matar a Jesús y también a Lázaro."],
    ],
    story: [
      "El estudio abre con una familia que Jesús amaba. Lázaro enferma, y sus hermanas envían un mensaje urgente. Ellas saben que Jesús puede ayudar. Pero Jesús no llega de inmediato. Su espera no es falta de cariño; permite que todos vean con claridad el poder de Jehová.",
      "Cuando Jesús llega a Betania, Marta sale a su encuentro. Hay dolor, pero también fe. Jesús la ayuda a mirar más allá de la tumba y le recuerda la esperanza de la resurrección. Después María cae a sus pies llorando. Jesús ve el dolor de sus amigos y también llora.",
      "Jesús va a la tumba, pide que quiten la piedra, ora a Jehová y llama a Lázaro. Lo que parecía definitivo se abre ante la voz de Jesús. Lázaro sale vivo. Muchos ponen fe en Jesús; otros, tristemente, se endurecen.",
    ],
    quote: "Lázaro ha muerto.",
    questions: [
      {
        question: "Cuenta la historia de cómo resucitó Jesús a Lázaro.",
        answer: "Lázaro se enfermó y murió. Jesús llegó a Betania cuando ya llevaba cuatro días en la tumba. Consoló a Marta y María, lloró con quienes estaban sufriendo, pidió que quitaran la piedra, oró a Jehová y llamó a Lázaro con voz fuerte. Entonces Lázaro salió vivo.",
      },
      {
        question: "¿Qué querían hacer los fariseos cuando se enteraron de la resurrección de Lázaro?",
        answer: "En vez de aceptar la prueba de que Jesús venía de Dios, se endurecieron. Planearon matar a Jesús y también a Lázaro, porque muchas personas creían en Jesús al ver a Lázaro vivo.",
      },
    ],
    meditate: [
      ["¿Qué me enseña que Jesús llorara?", "Me enseña que Jesús entiende el dolor humano. Su poder no lo hizo distante; su amor lo hizo cercano."],
      ["¿Qué me enseña la espera de Jesús antes de ir a Betania?", "Que una respuesta que parece tardar no significa abandono. Jehová puede estar preparando algo que fortalezca más la fe."],
      ["¿Qué me enseña la reacción de los fariseos?", "Que el orgullo puede cerrar los ojos ante pruebas claras. Por eso necesito mantener un corazón enseñable."],
    ],
    keyText: {
      quote: "El Dios verdadero es para nosotros un Dios que salva; Jehová, el Señor Soberano, libra de la muerte.",
      cite: "Salmo 68:20",
      explanation: [
        "Este texto conecta directamente con la resurrección de Lázaro. Para Jehová, la muerte no es un obstáculo definitivo.",
        "Ayuda a presentar la lección como una muestra clara de que Jehová puede salvar incluso cuando la situación parece cerrada.",
      ],
      support: {
        quote: "Yo soy la resurrección y la vida.",
        cite: "Juan 11:25",
        explanation: "Este texto ayuda a explicar por qué Marta podía confiar en la promesa de la resurrección.",
      },
    },
    principle: "Jehová puede resolver problemas imposibles para nosotros, incluso la muerte, y Jesús nos enseña a confiar en esa esperanza con fe.",
    thenNow: [
      { title: "En Betania", body: ["Marta y María estaban rodeadas de dolor. La tumba parecía el final de la historia.", "Jesús llegó con ternura y poder. Primero consoló, luego actuó."] },
      { title: "Hoy", body: ["También enfrentamos pérdidas que nos hacen llorar.", "La esperanza de la resurrección nos permite llorar, pero sin perder la confianza en Jehová."] },
    ],
    lessons: [
      "Jehová puede vencer la muerte y devolver la vida.",
      "Jesús entiende nuestro dolor y no lo trata con frialdad.",
      "La fe puede convivir con las lágrimas.",
      "La oposición no detiene el propósito de Jehová.",
      "Cuando Jehová parece tardar, eso no significa que nos haya abandonado.",
    ],
    texts: [
      "Juan 11:25 ayuda a destacar que Jesús es el medio que Jehová usa para dar vida.",
      "Juan 11:35 muestra que Jesús no fue frío ante el dolor; sintió compasión real.",
      "Juan 12:10 muestra hasta dónde puede llegar un corazón orgulloso cuando rechaza pruebas claras.",
    ],
    guide: [
      "No la presentes solo como un milagro impresionante. Detente en la compasión de Jesús.",
      "Haz que se note la fe de Marta y María, aunque estaban sufriendo.",
      "Cierra recalcando que Jehová puede liberar de la muerte.",
    ],
    application: [
      "Puedo llorar sin perder la fe.",
      "Puedo consolar a otros con la esperanza de la resurrección.",
      "Puedo confiar en Jehová aunque una respuesta parezca tardar.",
    ],
    jehova: [
      { title: "Jehová es poderoso", body: "Puede liberar de la muerte y cumplir lo que promete." },
      { title: "Jehová es compasivo", body: "No ignora el dolor de sus siervos; da consuelo y esperanza." },
      { title: "Jehová usa a Jesús", body: "Mediante Jesús demuestra su poder y su amor por las personas." },
    ],
    finalTexts: [
      ["Juan 11:1-53", "Relato principal de la enfermedad, muerte y resurrección de Lázaro."],
      ["Juan 11:25", "Jesús ayuda a Marta a mirar más allá de la muerte."],
      ["Juan 11:35", "Jesús muestra compasión sincera."],
      ["Juan 12:10", "La oposición religiosa rechaza una prueba clara del poder de Jehová."],
    ],
  },
  {
    id: "leccion-87",
    label: "Lección 87",
    title: "La última cena de Jesús",
    meta: ["Mateo 26:20-30; Lucas 22:14-26", "PDF págs. 204-205", "Humildad, amor y unidad"],
    situarte: {
      when: "Jerusalén, noche de la Pascua del año 33.",
      intro: [
        "La lección muestra a Jesús en una de sus últimas noches con los apóstoles antes de morir. Él sabe que será traicionado y arrestado, pero sigue enseñando con calma.",
        "Sirve para ayudar a la congregación a valorar el sacrificio de Jesús y a copiar su humildad, su amor y su deseo de unidad.",
      ],
      characters: [
        { title: "Jesús", subtitle: "Maestro y futuro Rey", body: "Instituye la Cena del Señor, corrige con paciencia y enseña a amar." },
        { title: "Los apóstoles fieles", subtitle: "Discípulos que necesitan preparación", body: "Reciben una promesa sobre el Reino y lecciones de humildad y unidad." },
        { title: "Judas", subtitle: "El traidor", body: "Sale de la cena para seguir adelante con su traición." },
        { title: "Jehová", subtitle: "El Padre que escucha", body: "Jesús ora a él y pide que cuide a sus discípulos." },
        { title: "Los discípulos de hoy", subtitle: "Los que imitan a Cristo", body: "Demuestran que siguen a Jesús por el amor que se tienen." },
      ],
      scenario: [
        "Jesús celebra la Pascua con sus apóstoles en una habitación de arriba.",
        "La noche es seria: Judas está por traicionarlo y Jesús pronto será arrestado.",
        "Aun así, Jesús usa ese momento para enseñar gratitud, humildad, servicio, amor y unidad.",
      ],
    },
    sequence: [
      ["La Pascua", "Jesús y sus apóstoles comen juntos en Jerusalén."],
      ["Judas identificado", "Jesús dice que uno de ellos lo va a traicionar y Judas se va."],
      ["Cena del Señor", "Jesús usa el pan y el vino para enseñar cómo recordar su sacrificio."],
      ["Promesa del Reino", "Jesús promete a sus apóstoles fieles que reinarán con él."],
      ["Corrección con amor", "Los apóstoles discuten sobre quién es más importante y Jesús les enseña a servir."],
      ["Amor y unidad", "Jesús recalca que sus discípulos se reconocerán por el amor y ora por ellos."],
    ],
    story: [
      "La lección 87 nos lleva a Jerusalén, al año 33. Jesús y los apóstoles celebran la Pascua. Al final de la cena, Jesús dice que uno de ellos lo va a traicionar. Los apóstoles se sorprenden, y Jesús identifica a Judas. Después de recibir el pedazo de pan, Judas se levanta y se va.",
      "Luego Jesús establece la Cena del Señor. Usa el pan para representar su cuerpo y el vino para representar su sangre. Con esto enseña que sus discípulos deben recordar su sacrificio todos los años. También les promete a sus apóstoles fieles que serán reyes con él en el cielo.",
      "Después surge una discusión triste: los apóstoles empiezan a hablar sobre quién era más importante. Jesús no pierde la paciencia. Los corrige y les enseña que el que quiera ser importante debe comportarse como el más pequeño. La grandeza cristiana no se mide por recibir atención, sino por servir.",
      "Jesús también les dice que son sus amigos y que la gente sabrá que son sus discípulos por el amor que se tengan. Al final, ora a Jehová para que cuide a todos los discípulos, los ayude a trabajar unidos y santifique su nombre. Después cantan alabanzas y salen; el arresto de Jesús está muy cerca.",
    ],
    quote: "A los verdaderos cristianos se les reconoce por el amor.",
    questions: [
      {
        question: "¿Qué prometió Jesús a sus apóstoles?",
        answer: "Les prometió que serían reyes con él en el cielo. Esa promesa les ayudaba a mirar más allá de aquella noche difícil y a confiar en que Jehová cumpliría su propósito mediante el Reino.",
      },
      {
        question: "Durante la última cena que Jesús comió con sus apóstoles, ¿qué importantes lecciones les enseñó?",
        answer: "Les enseñó a recordar su sacrificio mediante la Cena del Señor, a no buscar importancia personal, a comportarse como servidores, a trabajar unidos y a amarse unos a otros como él los había amado.",
      },
    ],
    meditate: [
      ["¿Qué me enseña que Jesús siguiera enseñando esa noche?", "Que el amor verdadero no se apaga bajo presión. Jesús siguió pensando en sus discípulos aunque sabía que sufriría."],
      ["¿Qué me enseña la discusión de los apóstoles?", "Que incluso personas fieles pueden necesitar corrección. Lo importante es aceptar la enseñanza de Jesús y aprender a servir."],
      ["¿Cómo puedo mostrar que soy discípulo de Cristo?", "Tratando a los hermanos con amor sincero, evitando competir por importancia y fortaleciendo la unidad."],
    ],
    keyText: {
      quote: "Todos sabrán que ustedes son mis discípulos si se tienen amor unos a otros.",
      cite: "Juan 13:35",
      explanation: [
        "Este texto resume una de las ideas centrales de la lección. Jesús no dijo que sus discípulos se reconocerían por buscar importancia, sino por el amor.",
        "Ayuda a dirigir la conversación hacia la aplicación: recordar el sacrificio de Jesús debe verse en nuestra manera de tratar a los demás.",
      ],
      support: {
        quote: "Su Padre quiere darles el Reino.",
        cite: "Lucas 12:32",
        explanation: "Este texto ayuda a responder la primera pregunta de la lección: Jesús animó a sus apóstoles con la esperanza del Reino.",
      },
    },
    principle: "Recordar el sacrificio de Jesús debe movernos a vivir con humildad, servicio, amor y unidad.",
    thenNow: [
      { title: "En la última cena", body: ["Jesús estaba por sufrir, pero pensó en preparar y fortalecer a sus discípulos.", "Corrigió la ambición y les enseñó a servir."] },
      { title: "Hoy", body: ["También necesitamos recordar el sacrificio de Jesús con gratitud.", "La congregación se fortalece cuando servimos con humildad y nos tratamos con amor sincero."] },
    ],
    lessons: [
      "La Cena del Señor nos ayuda a recordar el valor del sacrificio de Jesús.",
      "Jesús quiere discípulos humildes, no personas que compitan por importancia.",
      "Servir a otros vale más que recibir atención.",
      "El amor identifica a los verdaderos cristianos.",
      "La unidad de la congregación fue tan importante para Jesús que oró por ella.",
    ],
    texts: [
      "Lucas 12:32 ayuda a explicar la promesa del Reino que Jesús hizo a sus apóstoles fieles.",
      "Lucas 22:24-26 muestra que Jesús corrigió el deseo de ser más importante.",
      "Juan 13:34, 35 deja claro que el amor identifica a los discípulos de Cristo.",
    ],
    guide: [
      "No la enfoques solo en la Conmemoración. También destaca el tipo de personas que Jesús quiere que seamos.",
      "Subraya que Jesús siguió enseñando con calma aunque sabía que Judas lo iba a traicionar.",
      "Cierra recalcando humildad, unidad y amor como marcas de los discípulos verdaderos.",
    ],
    application: [
      "Puedo valorar más el sacrificio de Jesús.",
      "Puedo servir sin buscar importancia personal.",
      "Puedo fortalecer la unidad tratando a los hermanos con amor sincero.",
    ],
    jehova: [
      { title: "Jehová valora el sacrificio de Jesús", body: "Quiere que recordemos con gratitud lo que su Hijo hizo por nosotros." },
      { title: "Jehová escucha las oraciones", body: "Jesús habló con su Padre y pidió que cuidara a sus discípulos." },
      { title: "Jehová ama la unidad", body: "Quiere que sus siervos trabajen juntos y se traten con amor." },
    ],
    finalTexts: [
      ["Mateo 26:20-30", "Relata la última cena, la traición de Judas y la institución de la Cena del Señor."],
      ["Lucas 22:14-26", "Incluye la promesa del Reino y la corrección sobre quién es realmente importante."],
      ["Juan 13:34, 35", "Presenta el mandato de amar como Jesús amó."],
      ["Juan 17:3-26", "Jesús ora por sus discípulos y por su unidad."],
    ],
  },
];

const sectionStudy = {
  id: "introduccion-seccion-13",
  label: "Sección 13",
  title: "Introducción a la sección 13",
  meta: ["PDF págs. 202-203", "Puente entre las lecciones", "Últimos días de Jesús"],
  story: [
    "El PDF cambia ahora el enfoque hacia los últimos días de Jesús. La introducción recuerda que Jesús vino a dar su vida por personas imperfectas. Aunque murió, venció al mundo. Hasta el final sirvió con humildad y perdonó cuando otros cometieron errores.",
    "Esta parte une la resurrección de Lázaro con la muerte y resurrección de Jesús. Si Jehová pudo devolverle la vida a Lázaro mediante Jesús, también podía ser leal con su propio Hijo y devolverle la vida después de su sacrificio.",
  ],
  points: [
    "Ningún problema es demasiado difícil para Jehová.",
    "Debemos servir y ayudar a otros, como hizo Jesús.",
    "A los verdaderos cristianos se les reconoce por el amor que se tienen.",
  ],
};

const list = (items) => `<ul class="study-list">${items.map((item) => `<li>${e(item)}</li>`).join("\n")}</ul>`;

const lessonStudyBlock = (lesson) => `
    <div class="lesson-block" id="${e(lesson.id)}">
      <div class="lesson-kicker">${e(lesson.label)}</div>
      <h3>${e(lesson.title)}</h3>
      <div class="lesson-meta-row">${lesson.meta.map((item) => `<span>${e(item)}</span>`).join("\n")}</div>
      <div class="study-part">
        <h4>1. Para situarte</h4>
        <h5>Cuándo</h5>
        <p>${e(lesson.situarte.when)}</p>
        ${p(lesson.situarte.intro)}
        <h5>Personajes principales</h5>
        <div class="grid cards">
          ${lesson.situarte.characters.map(card).join("\n")}
        </div>
        <h5>El escenario</h5>
        ${list(lesson.situarte.scenario)}
      </div>
      <div class="study-part">
        <h4>2. La secuencia de los hechos</h4>
        <div class="timeline">
          ${lesson.sequence.map(([label, body]) => `<div class="moment"><div><div class="label">${e(label)}</div><p>${e(body)}</p></div></div>`).join("\n")}
        </div>
      </div>
      <div class="study-part">
        <h4>3. La historia relatada</h4>
        ${p(lesson.story)}
        ${lesson.quote ? `<div class="quote">${e(lesson.quote)}</div>` : ""}
      </div>
      <div class="study-part">
        <h4>4. Preguntas del libro</h4>
        <div class="lesson-qa">
          ${lesson.questions.map((item) => `<article><strong>${e(item.question)}</strong><p>${e(item.answer)}</p></article>`).join("\n")}
        </div>
      </div>
      <div class="study-part">
        <h4>5. Preguntas para meditar</h4>
        ${lesson.meditate.map(([title, body]) => details({ title, body })).join("\n")}
      </div>
      <div class="study-part">
        <h4>6. Texto clave</h4>
        <div class="scripture"><blockquote>${e(lesson.keyText.quote)}</blockquote><cite>${e(lesson.keyText.cite)}</cite></div>
        ${p(lesson.keyText.explanation)}
        <h5>Texto de apoyo</h5>
        <div class="scripture"><blockquote>${e(lesson.keyText.support.quote)}</blockquote><cite>${e(lesson.keyText.support.cite)}</cite></div>
        <p>${e(lesson.keyText.support.explanation)}</p>
      </div>
      <div class="study-part">
        <h4>7. El principio que ilumina la escena</h4>
        <div class="note"><p><b>Principio central:</b> ${e(lesson.principle)}</p></div>
      </div>
      <div class="study-part">
        <h4>8. Entonces y ahora</h4>
        <div class="grid compare">
          ${lesson.thenNow.map(card).join("\n")}
        </div>
      </div>
      <div class="study-part">
        <h4>9. Lecciones que se desprenden del texto</h4>
        <ol class="lesson-list">
          ${lesson.lessons.map((item) => `<li><p>${e(item)}</p></li>`).join("\n")}
        </ol>
      </div>
      <div class="study-part">
        <h4>10. Textos clave</h4>
        ${list(lesson.texts)}
      </div>
      <div class="study-part">
        <h4>11. Cómo dirigirla</h4>
        ${list(lesson.guide)}
      </div>
      <div class="study-part">
        <h4>12. Aplicación personal</h4>
        ${list(lesson.application)}
      </div>
      <div class="study-part">
        <h4>13. Lo que aprendemos de Jehová</h4>
        <div class="quality">
          ${lesson.jehova.map(({ title, body }) => `<div class="card"><strong>${e(title)}</strong><p>${e(body)}</p></div>`).join("\n")}
        </div>
      </div>
      <div class="study-part">
        <h4>14. Explicación de los textos bíblicos</h4>
        <div class="final-texts">
          ${lesson.finalTexts.map(([ref, body]) => `<div class="final-block"><div><span class="ref">${e(ref)}</span><p>${e(body)}</p></div></div>`).join("\n")}
        </div>
      </div>
    </div>`;

const sectionStudyBlock = (section) => `
    <div class="lesson-block lesson-section" id="${e(section.id)}">
      <div class="lesson-kicker">${e(section.label)}</div>
      <h3>${e(section.title)}</h3>
      <div class="lesson-meta-row">${section.meta.map((item) => `<span>${e(item)}</span>`).join("\n")}</div>
      <div class="study-part">
        <h4>Resumen</h4>
        ${p(section.story)}
      </div>
      <div class="study-part">
        <h4>Ideas principales</h4>
        ${list(section.points)}
      </div>
    </div>`;

const questionCards = lessonStudies.flatMap((lesson) =>
  lesson.questions.map((item, index) => ({
    tag: `${lesson.label} · Pregunta ${index + 1}`,
    question: item.question,
    answer: item.answer,
  }))
);

const lessonPage = (lesson) => ({
  title: `${lesson.label}: ${lesson.title}`,
  eyebrow: "Lecciones que aprendo de la Biblia",
  roman: lesson.label.includes("86") ? "lxxxvi" : "lxxxvii",
  subtitle: `Estudio completo de ${lesson.label.toLowerCase()}, con el mismo formato de preparación para dirigir y repasar.`,
  meta: lesson.meta,
  nav: [[lesson.id, "i", "📖", lesson.label]],
});

const sectionPage = (section) => ({
  title: section.title,
  eyebrow: "Lecciones que aprendo de la Biblia",
  roman: "xiii",
  subtitle: "Introducción de la sección preparada como puente entre las lecciones 86 y 87.",
  meta: section.meta,
  nav: [[section.id, "i", "📖", section.label]],
});

const standaloneLessonContent = (lesson) => `
<section>
  <div class="story">
    <div class="ornament">❦</div>
    ${lessonStudyBlock(lesson)}
    <div class="ornament">❦</div>
  </div>
</section>`;

const standaloneSectionContent = (section) => `
<section>
  <div class="story">
    <div class="ornament">❦</div>
    ${sectionStudyBlock(section)}
    <div class="ornament">❦</div>
  </div>
</section>`;

const renderShell = ({ style, script, page = study, content = renderSections(), footerText }) => {
  const pageNav = page.nav || study.nav;
  const footer = footerText || "Jehová no solo puede vencer la muerte; también nos enseña a vivir con amor, humildad y unidad.<br />\n    Guía preparada para dirigir el Estudio Bíblico de la Congregación.";

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="Cache-Control" content="no-store" />
  <title>${e(page.title)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,400..800,70,1&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${style}</style>
</head>
<body>
  <div id="progressBar"></div>
  <button class="menu-btn" id="openNav" aria-label="Abrir índice">☰</button>
  <div class="overlay" id="overlay"></div>
  <nav class="side-nav" id="sideNav" aria-label="Índice del estudio">
    <div class="side-head"><h3>Índice</h3><button class="close" id="closeNav" aria-label="Cerrar índice">×</button></div>
    ${pageNav.map(([id, roman, icon, title]) => `<a href="#${id}"><em>${roman}</em> ${icon} ${e(title)}</a>`).join("\n    ")}
  </nav>
  <button class="top-btn" id="topBtn" aria-label="Volver arriba">↑</button>

  <header class="hero" id="top">
    <div class="wrap">
      <div class="hero-card">
        <div class="eyebrow">${e(page.eyebrow)}</div>
        <div class="roman">${e(page.roman)}</div>
        <h1>${e(page.title)}</h1>
        <p class="subtitle">${e(page.subtitle)}</p>
        <div class="hero-meta">
          ${page.meta.map((item) => `<span class="pill">${e(item)}</span>`).join("\n          ")}
        </div>
      </div>
    </div>
  </header>

  <main class="wrap">
    ${content}
  </main>

  <footer class="wrap">
    ${footer}
  </footer>

  <script>${script}</script>
</body>
</html>
`;
};

const renderSections = () => `
<section id="situarte">
  ${sectionTitle("situarte")}
  <h3>Cuándo</h3>
  <p class="lead">El estudio empieza en Betania, poco antes de la última Pascua de Jesús, y luego nos lleva a sus últimos días con los apóstoles en Jerusalén.</p>
  <p>La lección 86 muestra a Jesús frente a la muerte de un amigo amado. La introducción a la sección 13 abre el tema de sus últimos días. La lección 87 se centra en la última cena, donde Jesús enseña humildad, amor y unidad.</p>

  <h3>Material del PDF</h3>
  <div class="grid cards">
    ${[
      { title: "Lección 86", subtitle: "Jesús resucita a Lázaro", body: "Páginas 200-201 del PDF. Muestra la compasión de Jesús, el poder de Jehová sobre la muerte y la reacción endurecida de los opositores." },
      { title: "Introducción a la sección 13", subtitle: "Últimos días, muerte y resurrección de Jesús", body: "Páginas 202-203 del PDF. Resume que Jesús sirvió con humildad, perdonó y recibió vida de nuevo por la lealtad de Jehová." },
      { title: "Lección 87", subtitle: "La última cena de Jesús", body: "Páginas 204-205 del PDF. Presenta la Pascua del año 33, la traición de Judas, la Cena del Señor, la humildad, el amor y la unidad." },
    ].map(card).join("\n")}
  </div>

  <h3>Personajes principales</h3>
  <div class="grid cards">
    ${[
      { title: "Jehová", subtitle: "Fuente de la vida", body: "Demuestra que ningún problema es demasiado difícil para él, ni siquiera la muerte." },
      { title: "Jesús", subtitle: "El Hijo de Dios", body: "Consuela, resucita, sirve con humildad y prepara a sus discípulos para lo que viene." },
      { title: "Lázaro", subtitle: "Amigo de Jesús", body: "Su resurrección confirma de manera inolvidable el poder de Jehová." },
      { title: "Marta y María", subtitle: "Hermanas de Lázaro", body: "Expresan dolor, pero también se acercan a Jesús con fe." },
      { title: "Los apóstoles fieles", subtitle: "Discípulos de Jesús", body: "Reciben instrucciones sobre la Cena del Señor, el Reino, la humildad y el amor." },
      { title: "Judas y los líderes religiosos", subtitle: "Oposición endurecida", body: "Su reacción muestra lo peligroso que puede ser un corazón orgulloso." },
    ].map(card).join("\n")}
  </div>

  <h3>El hilo del estudio</h3>
  ${details({
    title: "De la tumba abierta a la cena de despedida",
    body: [
      "Primero vemos que Jehová puede devolver vida cuando Jesús resucita a Lázaro. Luego la sección 13 nos recuerda que Jesús también moriría, pero Jehová sería leal y le devolvería la vida. Finalmente, en la lección 87, Jesús enseña a sus discípulos cómo recordar su sacrificio y cómo vivir unidos por amor.",
      "Ese hilo ayuda a dirigir el estudio como una sola conversación: Jehová salva, Jesús sirve y nosotros aprendemos a vivir como discípulos verdaderos.",
    ],
  })}
  ${details({
    title: "Una idea para mantener unidas las tres partes",
    body: "Jehová tiene poder para salvar, y Jesús nos enseña a responder a ese amor sirviendo humildemente y amándonos unos a otros.",
  })}
</section>

<section id="secuencia">
  ${sectionTitle("secuencia")}
  <div class="timeline">
    ${[
      ["Mensaje urgente", "María y Marta avisan que Lázaro está muy enfermo."],
      ["Espera de Jesús", "Jesús no va de inmediato; permite que la situación revele algo más grande."],
      ["Llegada a Betania", "Jesús consuela a Marta y María, y se conmueve ante el dolor de todos."],
      ["Resurrección de Lázaro", "Jesús ora a Jehová, llama a Lázaro y él sale vivo de la tumba."],
      ["Oposición más fuerte", "Muchos creen, pero los líderes religiosos planean matar a Jesús, y también a Lázaro."],
      ["Lección importante 1", "La sección 13 recalca que ningún problema es demasiado difícil para Jehová."],
      ["Lección importante 2", "También enseña que debemos estar dispuestos a servir y ayudar a otros, como hizo Jesús."],
      ["Lección importante 3", "La sección recuerda que a los verdaderos cristianos se les reconoce por el amor que se tienen."],
      ["Pascua del año 33", "Jesús y sus apóstoles celebran la Pascua en una habitación de arriba en Jerusalén."],
      ["Judas se va", "Jesús identifica al traidor, y Judas sale para avanzar con su traición."],
      ["Cena del Señor", "Jesús usa el pan y el vino para enseñar cómo recordar su cuerpo y su sangre."],
      ["Humildad y amor", "Jesús corrige la discusión sobre quién era más importante y deja claro que sus discípulos se reconocerían por el amor."],
      ["Oración final", "Jesús pide a Jehová que cuide a sus discípulos, que estén unidos y que su nombre sea santificado."],
    ].map(([label, body]) => `<div class="moment"><div><div class="label">${e(label)}</div><p>${e(body)}</p></div></div>`).join("\n")}
  </div>
</section>

<section id="historia">
  ${sectionTitle("historia")}
  <div class="story">
    <div class="ornament">❦</div>
    ${lessonStudyBlock(lessonStudies[0])}
    ${sectionStudyBlock(sectionStudy)}
    ${lessonStudyBlock(lessonStudies[1])}
    <p class="closing">En estas tres partes vemos a Jehová como el Dios que salva y a Jesús como el Maestro que nos enseña a responder con fe, humildad y amor.</p>
    <div class="ornament">❦</div>
  </div>
</section>

<section id="preguntas">
  ${sectionTitle("preguntas")}
  <div class="qa">
    <div class="question-card">
      <span class="tag">Sección 13 · Lecciones importantes</span>
      <h3>¿Qué tres ideas quiere destacar la introducción a la sección 13?</h3>
      <p>Que ningún problema es demasiado difícil para Jehová, que debemos estar dispuestos a servir y ayudar a otros como Jesús, y que a los verdaderos cristianos se les reconoce por el amor que se tienen.</p>
    </div>
    ${questionCards.map((item) => `
    <div class="question-card">
      <span class="tag">${e(item.tag)}</span>
      <h3>${e(item.question)}</h3>
      <p>${e(item.answer)}</p>
    </div>`).join("\n")}
  </div>
</section>

<section id="meditar" class="meditate">
  ${sectionTitle("meditar")}
  ${[
    ["¿Qué me enseña que Jesús llorara?", "Me enseña que Jesús entiende el dolor humano. Su poder no lo hizo distante; su amor lo hizo cercano."],
    ["¿Qué me enseña la espera de Jesús antes de ir a Betania?", "Que una respuesta que parece tardar no significa abandono. Jehová puede estar preparando algo que fortalezca más la fe."],
    ["¿Qué me enseña la reacción de los fariseos?", "Que el orgullo puede cerrar los ojos ante pruebas claras. Por eso necesito mantener un corazón enseñable."],
    ["¿Qué idea de la sección 13 necesito recordar más?", "Que ningún problema es demasiado difícil para Jehová. Si él pudo devolver la vida a Lázaro y resucitar a Jesús, también puede ayudarnos en problemas que parecen imposibles."],
    ["¿Qué me enseña Jesús al servir hasta el final?", "Que el servicio cristiano no depende de que las circunstancias sean fáciles. Jesús siguió ayudando, enseñando y perdonando aun bajo presión."],
    ["¿Cómo puedo imitar a Jesús en la congregación?", "Puedo servir sin buscar atención, escuchar con cariño, perdonar y tratar a los hermanos con amor sincero."],
    ["¿Cómo me ayuda la Cena del Señor?", "Me ayuda a valorar el sacrificio de Jesús y a recordar que mi vida debe reflejar gratitud, humildad y amor."],
    ["¿Qué clase de ambiente quería Jesús entre sus discípulos?", "Un ambiente de amistad, paz, unidad y amor. No quería competencia, orgullo ni deseo de sobresalir."],
  ].map(([title, body]) => details({ title, body })).join("\n")}
</section>

<section id="texto">
  ${sectionTitle("texto")}
  <div class="scripture"><blockquote>El Dios verdadero es para nosotros un Dios que salva; Jehová, el Señor Soberano, libra de la muerte.</blockquote><cite>Salmo 68:20</cite></div>
  <h3>¿Qué aprendemos de este texto?</h3>
  <p>Este texto conecta directamente con la resurrección de Lázaro. Para Jehová, la muerte no es un obstáculo definitivo. Él tiene poder para salvar de la situación más dolorosa que enfrenta la humanidad.</p>
  <p>También prepara el corazón para la lección 87. Jesús está por dar su vida, pero Jehová no lo abandonará. El Dios que libra de la muerte también devolverá la vida a su propio Hijo.</p>
  <h3>Texto de apoyo</h3>
  <div class="scripture"><blockquote>No teman, rebaño pequeño, porque su Padre quiere darles el Reino.</blockquote><cite>Lucas 12:32</cite></div>
  <p>Este texto ayuda a responder la primera pregunta de la lección 87. Jesús no solo les habló de sufrimiento; también les dio una esperanza concreta: estar con él en el Reino.</p>
</section>

<section id="principio">
  ${sectionTitle("principio")}
  <div class="note">
    <p><b>Principio central:</b> Jehová puede resolver problemas imposibles para nosotros, y Jesús nos enseña a responder a ese amor con fe, humildad y amor cristiano.</p>
    <p>La lección 86 fortalece la esperanza. La sección 13 resume el ejemplo final de Jesús: servir, perdonar y confiar en Jehová. La lección 87 muestra cómo ese ejemplo debe moldear la congregación: recordar el sacrificio de Jesús, evitar el orgullo y amarnos unos a otros.</p>
  </div>
</section>

<section id="entonces">
  ${sectionTitle("entonces")}
  <div class="grid compare">
    ${card({
      title: "En Betania",
      body: [
        "Marta y María enfrentaban una pérdida real. La tumba parecía cerrar la historia.",
        "Jesús llegó con ternura y poder. La voz que llamó a Lázaro mostró que Jehová puede vencer la muerte.",
      ],
    })}
    ${card({
      title: "En la sección 13",
      body: [
        "El PDF resume las lecciones que sostienen todo el bloque: Jehová puede con cualquier problema, Jesús sirvió con humildad y el amor identifica a sus discípulos.",
        "Esta introducción funciona como puente entre la resurrección de Lázaro y la última cena.",
      ],
    })}
    ${card({
      title: "En la última cena",
      body: [
        "Los apóstoles necesitaban preparación para una noche difícil. Jesús les dio una forma de recordar su sacrificio y una esperanza relacionada con el Reino.",
        "También corrigió su deseo de importancia y les dio una marca clara: el amor.",
      ],
    })}
    ${card({
      title: "En la congregación hoy",
      body: [
        "También necesitamos consuelo, humildad y unidad.",
        "Cuando amamos y servimos como Jesús, demostramos que la esperanza de Jehová ya está cambiando nuestra manera de vivir.",
      ],
    })}
  </div>
</section>

<section id="lecciones">
  ${sectionTitle("lecciones")}
  <ol class="lesson-list">
    ${[
      "Jehová puede vencer la muerte y devolver la vida.",
      "Jesús entiende nuestro dolor y no lo trata con frialdad.",
      "La fe puede convivir con las lágrimas.",
      "La oposición no detiene el propósito de Jehová.",
      "La sección 13 enseña que ningún problema es demasiado difícil para Jehová.",
      "Jesús sirvió con humildad hasta el final y perdonó cuando otros fallaron.",
      "Jesús quiere discípulos humildes, no personas que compitan por importancia.",
      "La Cena del Señor nos ayuda a recordar el valor del sacrificio de Jesús.",
      "El amor identifica a los verdaderos cristianos.",
      "La unidad de la congregación fue tan importante para Jesús que oró por ella.",
      "Recordar el sacrificio de Jesús debe movernos a vivir agradecidos.",
    ].map((item) => `<li><p>${e(item)}</p></li>`).join("\n")}
  </ol>
</section>

<section id="aplicacion">
  ${sectionTitle("aplicacion")}
  <div class="application">
    <h3>Preguntas al corazón</h3>
    <ul class="heart-list">
      ${[
        "Cuando Jehová parece tardar, ¿sigo confiando en su amor?",
        "¿Uso la esperanza de la resurrección para consolar a otros?",
        "¿Sirvo a los hermanos sin buscar reconocimiento?",
        "¿Acepto corrección cuando noto orgullo o deseo de sobresalir?",
        "¿Estoy dispuesto a perdonar, como Jesús enseñó?",
        "¿Mi trato con los demás deja claro que soy discípulo de Cristo?",
        "¿Qué puedo hacer esta semana para fortalecer la unidad de la congregación?",
      ].map((item) => `<li>${e(item)}</li>`).join("\n")}
    </ul>
  </div>
</section>

<section id="jehova">
  ${sectionTitle("jehova")}
  <p class="lead">Las tres partes del estudio nos ayudan a ver a Jehová con más claridad.</p>
  <div class="quality">
    ${[
      { title: "Jehová es poderoso", body: "Puede liberar de la muerte y cumplir lo que promete." },
      { title: "Jehová es compasivo", body: "No ignora el dolor de sus siervos; da consuelo y esperanza." },
      { title: "Jehová es leal", body: "No abandonó a Jesús. Lo sostuvo y después lo resucitó." },
      { title: "Jehová valora la unidad", body: "Quiere que sus siervos se amen y trabajen juntos en paz." },
      { title: "Jehová escucha las oraciones", body: "Jesús oró antes de resucitar a Lázaro y también oró por sus discípulos al final de la cena." },
      { title: "Jehová nos da una obra", body: "Después de la resurrección de Jesús, sus discípulos reciben trabajo importante; hoy participamos en esa misma obra." },
    ].map(({ title, body }) => `<div class="card"><strong>${e(title)}</strong><p>${e(body)}</p></div>`).join("\n")}
  </div>
</section>

<section id="conexion">
  ${sectionTitle("conexion")}
  <div class="grid connections">
    ${[
      { title: "Lección 86", subtitle: "Jesús resucita a Lázaro", body: "La esperanza de la resurrección se ve con fuerza y ternura." },
      { title: "Introducción sección 13", subtitle: "Puente del estudio", body: "Resume la humildad, el perdón, la resurrección y el trabajo que Jesús encarga. También da tres lecciones importantes para aplicar." },
      { title: "Lección 87", subtitle: "La última cena de Jesús", body: "Muestra cómo recordar el sacrificio de Jesús, confiar en la promesa del Reino, servir con humildad y vivir con amor." },
      { title: "Para la reunión", subtitle: "Un solo hilo", body: "Jehová salva; Jesús sirve; nosotros respondemos con fe, humildad y amor." },
    ].map(({ title, subtitle, body }) => `<div class="card"><span class="lesson-badge">${e(title)}</span><strong>${e(subtitle)}</strong><p>${e(body)}</p></div>`).join("\n")}
  </div>
</section>

<section id="textos">
  ${sectionTitle("textos")}
  <div class="final-texts">
    ${[
      ["Juan 11:1-53", "Relato principal de la enfermedad, muerte y resurrección de Lázaro. Muestra compasión, fe y poder de Jehová mediante Jesús."],
      ["Juan 12:10", "Muestra que los líderes religiosos querían matar también a Lázaro. Su orgullo rechazó una prueba viva del poder de Dios."],
      ["Mateo 26:14-16", "Muestra la decisión de Judas de entregar a Jesús por dinero. La oposición contra Jesús avanza hacia su arresto."],
      ["Mateo 26:20-30; Lucas 22:14-26", "Relatan la última cena, la promesa del Reino, la Cena del Señor y la corrección sobre la humildad."],
      ["Juan 13:1, 2, 26, 30, 34, 35", "Destacan la traición de Judas y el nuevo mandamiento de amar como Jesús amó."],
      ["Juan 15:12-19; 17:3-26", "Jesús habla del amor, la amistad con sus discípulos y ora para que estén unidos."],
    ].map(([ref, body]) => `<div class="final-block"><div><span class="ref">${e(ref)}</span><p>${e(body)}</p></div></div>`).join("\n")}
  </div>
</section>
`;

const main = async () => {
  const reference = await fs.readFile(referenceHtmlPath, "utf8");
  const baseStyle = reference.match(/<style>([\s\S]*?)<\/style>/)?.[1];
  const script = reference.match(/<script>([\s\S]*?)<\/script>/)?.[1];

  if (!baseStyle || !script) {
    throw new Error("No se pudo leer el estilo o el script del HTML de referencia.");
  }

  await fs.mkdir(outputDir, { recursive: true });
  const style = `${baseStyle}\n${extraStyle}`;
  const pages = [
    [`${study.slug}.html`, renderShell({ style, script })],
    ["lfb-leccion-86.html", renderShell({
      style,
      script,
      page: lessonPage(lessonStudies[0]),
      content: standaloneLessonContent(lessonStudies[0]),
      footerText: "Guía preparada para estudiar y dirigir la Lección 86.",
    })],
    ["lfb-seccion-13.html", renderShell({
      style,
      script,
      page: sectionPage(sectionStudy),
      content: standaloneSectionContent(sectionStudy),
      footerText: "Puente preparado entre la Lección 86 y la Lección 87.",
    })],
    ["lfb-leccion-87.html", renderShell({
      style,
      script,
      page: lessonPage(lessonStudies[1]),
      content: standaloneLessonContent(lessonStudies[1]),
      footerText: "Guía preparada para estudiar y dirigir la Lección 87.",
    })],
  ];

  await Promise.all(pages.map(([fileName, html]) =>
    fs.writeFile(path.join(outputDir, fileName), html, "utf8")
  ));

  pages.forEach(([fileName]) => {
    console.log(`Estudio generado: ${path.relative(rootDir, path.join(outputDir, fileName))}`);
  });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
