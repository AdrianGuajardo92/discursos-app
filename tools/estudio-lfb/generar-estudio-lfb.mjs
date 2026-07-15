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
    .app-back{
      position:fixed;
      top:18px;
      left:18px;
      z-index:80;
      display:inline-flex;
      align-items:center;
      gap:8px;
      min-height:44px;
      padding:9px 14px;
      border:1px solid rgba(176,132,66,.45);
      border-radius:999px;
      background:rgba(251,246,236,.94);
      color:var(--forest);
      box-shadow:0 12px 30px rgba(42,36,28,.14);
      text-decoration:none;
      font-family:Inter, system-ui, sans-serif;
      font-size:.82rem;
      font-weight:900;
      letter-spacing:.04em;
      backdrop-filter:blur(10px);
    }
    .app-back:hover{transform:translateY(-2px);}
    .app-back span{font-size:1.15rem; line-height:1;}
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
    .lesson-jump{
      margin-top:24px;
      padding:18px;
      border-color:rgba(176,132,66,.36);
      background:linear-gradient(135deg, rgba(255,250,241,.82), rgba(239,224,189,.38));
    }
    .lesson-jump-grid{
      display:grid;
      grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));
      gap:12px;
    }
    .lesson-jump-link{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:14px;
      min-height:92px;
      padding:16px 18px;
      border:1px solid rgba(47,74,58,.18);
      border-radius:18px;
      background:rgba(255,255,255,.58);
      box-shadow:0 12px 26px rgba(42,36,28,.08);
      color:var(--forest);
      text-decoration:none;
      transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;
    }
    .lesson-jump-link:hover{
      transform:translateY(-2px);
      border-color:rgba(176,132,66,.55);
      box-shadow:0 16px 32px rgba(42,36,28,.12);
    }
    .lesson-jump-copy{
      min-width:0;
    }
    .lesson-jump-copy small{
      display:block;
      margin-bottom:5px;
      color:var(--gold);
      font-family:Inter, system-ui, sans-serif;
      font-size:.72rem;
      font-weight:900;
      letter-spacing:.12em;
      text-transform:uppercase;
    }
    .lesson-jump-copy strong{
      display:block;
      overflow-wrap:anywhere;
      color:var(--forest);
      font-family:Fraunces, serif;
      font-size:1.28rem;
      line-height:1.05;
    }
    .lesson-jump-copy span{
      display:block;
      margin-top:4px;
      color:var(--muted);
      font-size:.9rem;
      font-weight:800;
    }
    .lesson-jump-arrow{
      display:grid;
      place-items:center;
      flex:0 0 auto;
      width:42px;
      height:42px;
      border-radius:50%;
      background:var(--forest);
      color:#fff;
      font-family:Inter, system-ui, sans-serif;
      font-size:1.3rem;
      font-weight:900;
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
      .app-back{
        top:12px;
        left:12px;
        min-height:40px;
        padding:8px 11px;
        font-size:.74rem;
      }
      .lesson-block{
        padding:18px 15px;
        margin:24px 0;
        border-radius:18px;
      }
      .lesson-jump{
        padding:14px;
      }
      .lesson-jump-link{
        min-height:84px;
        padding:14px;
      }
    }
`;

const questionSignStyle = `
    .question-sign{
      display:inline-flex;
      align-items:center;
      gap:8px;
      margin:0 0 8px;
      border:1px solid rgba(176,132,66,.38);
      border-radius:999px;
      padding:5px 11px;
      background:rgba(255,255,255,.5);
      color:var(--forest);
      font-size:.82rem;
      font-weight:900;
    }
    .question-sign em{
      color:var(--gold);
      font-style:normal;
      letter-spacing:.12em;
      text-transform:uppercase;
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
      ["¿Qué revela de Jesús que primero llorara con sus amigos antes de resolver el problema?", "Revela que Jesús no consuela desde lejos. Aunque sabía que iba a resucitar a Lázaro, se detuvo a sentir el dolor de sus amigos. Eso me ayuda a consolar con ternura antes de tratar de explicar o resolver."],
      ["Cuando Jehová parece tardar, ¿qué sale a la luz sobre mi confianza en él?", "Sale a la luz si confío solo cuando la respuesta llega rápido o si sigo creyendo que Jehová ve más que yo. La espera puede revelar y fortalecer mi fe."],
      ["¿Qué me enseña la actitud de los fariseos sobre el peligro de tener el corazón cerrado aun viendo pruebas?", "Que ver pruebas no basta si el orgullo domina el corazón. Necesito mantenerme humilde, dispuesto a dejarme corregir y a alegrarme cuando Jehová actúa."],
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

const studyMay26 = {
  slug: "lfb-lecciones-88-89",
  title: "Lecciones 88 y 89",
  eyebrow: "Lecciones que aprendo de la Biblia",
  roman: "lxxxviii · lxxxix",
  subtitle: "Estudio completo de las lecciones 88 y 89, preparado para dirigir el Estudio Bíblico de la Congregación.",
  meta: [
    "Mateo 26:36-57",
    "Lucas 22:39-71",
    "Juan 18:1-28",
    "PDF págs. 206-209",
    "30 minutos",
  ],
  nav: [
    ["leccion-88", "lxxxviii", "📖", "Lección 88"],
    ["leccion-89", "lxxxix", "📖", "Lección 89"],
  ],
};

const may26LessonStudies = [
  {
    id: "leccion-88",
    label: "Lección 88",
    roman: "lxxxviii",
    title: "Arrestan a Jesús",
    meta: ["Mateo 26:36-57; Marcos 14:32-50", "Lucas 22:39-54; Juan 18:1-14, 19-24", "PDF págs. 206-207"],
    indexLinks: [
      { id: "leccion-88", icon: "📖", title: "Lección 88", href: "#leccion-88" },
      { id: "leccion-89", icon: "📖", title: "Lección 89", href: "/estudios-lfb/lfb-leccion-89.html?v=20260526-1#leccion-89" },
    ],
    jumpLinks: [
      {
        label: "Siguiente",
        title: "Lección 89",
        body: "Pedro niega a Jesús",
        href: "/estudios-lfb/lfb-leccion-89.html?v=20260526-1#leccion-89",
        arrow: "→",
      },
    ],
    situarte: {
      when: "Jardín de Getsemaní, después de la última cena, ya entrada la noche.",
      intro: [
        "La lección muestra a Jesús en una noche de mucha presión. Sabe que Judas lo va a entregar y que sus enemigos vienen por él, pero no pierde el equilibrio ni deja de confiar en Jehová.",
        "Sirve para ayudar a la congregación a ver cómo se ve la valentía verdadera: orar, aceptar la voluntad de Jehová, actuar con calma y no responder con violencia.",
      ],
      characters: [
        { title: "Jesús", subtitle: "El Hijo obediente", body: "Ora con intensidad, acepta la voluntad de Jehová, protege a sus discípulos y se entrega sin perder la calma." },
        { title: "Jehová", subtitle: "El Padre que fortalece", body: "Sostiene a Jesús en una hora angustiosa y le da la fuerza que necesita para seguir fiel." },
        { title: "Pedro, Santiago y Juan", subtitle: "Discípulos cansados", body: "Acompañan a Jesús, pero se quedan dormidos en un momento muy serio." },
        { title: "Judas Iscariote", subtitle: "El traidor", body: "Llega al jardín con un grupo armado porque conoce el lugar donde Jesús se reunía con sus apóstoles." },
        { title: "Pedro", subtitle: "Impulsivo pero leal", body: "Trata de defender a Jesús con una espada, pero Jesús le enseña que sus discípulos no luchan de esa manera." },
        { title: "Malco", subtitle: "Esclavo del sumo sacerdote", body: "Resulta herido por Pedro y Jesús lo cura, mostrando compasión incluso en medio del arresto." },
      ],
      scenario: [
        "Jesús y los apóstoles cruzan el valle de Cedrón y llegan a Getsemaní.",
        "Jesús se aparta para orar, mientras tres discípulos deben mantenerse despiertos.",
        "Judas llega con un grupo armado; Jesús no huye ni responde con violencia.",
      ],
    },
    sequence: [
      ["Llegan a Getsemaní", "Jesús pide a sus discípulos que se queden allí y se mantengan despiertos."],
      ["Jesús ora", "Se siente muy angustiado, se arrodilla y pide que se haga la voluntad de Jehová."],
      ["Los discípulos duermen", "Jesús vuelve y encuentra dormidos a Pedro, Santiago y Juan."],
      ["Judas llega", "Trae a un grupo armado porque sabe dónde encontrar a Jesús."],
      ["Pedro usa la espada", "Pedro hiere a Malco, pero Jesús lo detiene y cura al hombre herido."],
      ["Jesús es arrestado", "Los soldados atan a Jesús y los apóstoles huyen."],
      ["Lo llevan a Anás y Caifás", "El interrogatorio empieza, y la presión contra Jesús aumenta."],
    ],
    story: [
      "La noche ya estaba muy avanzada. Jesús y los apóstoles salieron hacia el monte de los Olivos, cruzaron el valle de Cedrón y llegaron al jardín de Getsemaní. La luna llena iluminaba el lugar, pero el ambiente se sentía pesado. Jesús sabía que aquella no era una noche cualquiera. Les pidió a sus discípulos que se quedaran cerca y se mantuvieran despiertos, y luego se apartó un poco para orar.",
      "Allí, de rodillas, Jesús abrió su corazón a Jehová. Sentía una angustia profunda, pero no se dejó dominar por el miedo. Su oración muestra una lealtad preciosa: si tenía que pasar por aquella prueba, quería hacerlo obedeciendo la voluntad de su Padre. Mientras tanto, Pedro, Santiago y Juan no lograron mantenerse despiertos. Cuando Jesús volvió y los encontró dormidos, les habló con ternura, pero también con urgencia: la hora había llegado.",
      "De pronto, la calma del jardín se rompió. Judas apareció con un grupo armado que traía antorchas y garrotes. Conocía bien aquel lugar, porque Jesús se reunía allí muchas veces con sus apóstoles. Judas se acercó como si fuera un amigo y lo saludó con un beso, pero aquel gesto no era cariño; era una señal para entregarlo.",
      "Jesús no retrocedió. Dio un paso al frente y preguntó a quién buscaban. Cuando ellos dijeron que buscaban a Jesús el Nazareno, él se identificó con firmeza. El grupo retrocedió y cayó al suelo. Aun en ese momento, Jesús pensó en sus discípulos y dejó claro que a ellos debían dejarlos ir.",
      "Entonces Pedro, al ver lo que estaba pasando, sacó una espada y atacó al esclavo del sumo sacerdote, Malco, cortándole la oreja. Jesús lo detuvo de inmediato. No iba a permitir que sus discípulos defendieran la verdad con violencia. Tocó al hombre herido y lo curó. Hasta en la noche de su arresto, Jesús mostró calma, poder y compasión.",
      "Después, los soldados ataron a Jesús. Los apóstoles, llenos de miedo, huyeron. Primero llevaron a Jesús ante Anás, y luego a la casa del sumo sacerdote Caifás. La presión contra Jesús aumentaba, pero él seguía firme. Y ahora queda una pregunta que nos lleva a la siguiente escena: ¿qué pasó con los apóstoles después de aquella noche?",
    ],
    quote: "Que se haga tu voluntad.",
    questions: [
      {
        question: "¿Qué pasó en el jardín de Getsemaní?",
        senas: "Allí, área, parque, ¿qué pasó?",
        answer: "Jesús oró a Jehová en medio de una gran angustia. Sus discípulos se quedaron dormidos. Luego Judas llegó con un grupo armado para entregar a Jesús. Pedro trató de defenderlo con una espada, pero Jesús lo detuvo, curó a Malco y permitió que lo arrestaran.",
      },
      {
        question: "¿Qué aprendemos de lo que Jesús hizo esa noche?",
        senas: "¿Tú aprender qué?",
        answer: "Aprendemos a orar cuando sentimos presión, a aceptar la voluntad de Jehová, a mantener la calma cuando nos tratan mal y a no usar métodos violentos. Jesús fue valiente porque siguió obedeciendo aunque sabía que iba a sufrir.",
      },
    ],
    meditate: [
      ["¿Por qué creen que Jesús buscó a Jehová en oración antes de que llegaran sus enemigos?", "Porque la presión era real, y Jesús sabía que necesitaba mantenerse cerca de su Padre. Esto ayuda al auditorio a ver que orar no es lo último que hacemos cuando ya no podemos más; es lo primero que nos mantiene firmes."],
      ["¿Qué nos enseña que Jesús se preocupara por sus discípulos aun cuando él era quien iba a ser arrestado?", "Nos enseña que el amor de Jesús no se apagó bajo presión. Aunque él iba a sufrir, pensó en proteger a sus discípulos y pidió que los dejaran ir."],
      ["¿Qué contraste vemos entre la reacción de Pedro y la reacción de Jesús?", "Pedro reaccionó por impulso y usó la espada. Jesús actuó con calma, corrigió a Pedro y mostró que sus discípulos no defienden la verdad con violencia."],
      ["¿Qué aprendemos de que Jesús curara a Malco justo después de que venían a arrestarlo?", "Aprendemos que Jesús no permitió que la injusticia le quitara la compasión. Hasta en una noche tan difícil, siguió haciendo el bien."],
      ["¿Cómo puede ayudarnos esta escena cuando sentimos presión o nos tratan injustamente?", "Nos enseña a orar, conservar la calma, evitar respuestas impulsivas y confiar en que Jehová ve la situación completa."],
    ],
    meditateTitle: "Preguntas para el auditorio",
    keyText: {
      quote: "En el mundo van a tener sufrimientos. Pero sean valientes.",
      cite: "Juan 16:33",
      explanation: [
        "Este texto encaja con Getsemaní porque Jesús no negó que vendrían sufrimientos. Él mismo estaba entrando en una noche durísima.",
        "La valentía cristiana no es ausencia de miedo. Es seguir confiando en Jehová y hacer lo correcto aunque la situación sea difícil.",
      ],
      support: {
        quote: "Guarda tu espada.",
        cite: "Mateo 26:52",
        explanation: "Este texto ayuda a destacar que Jesús no quería que sus discípulos defendieran el Reino con violencia.",
      },
    },
    principle: "Cuando la presión aumenta, la fidelidad se protege con oración, calma, obediencia y confianza en Jehová.",
    thenNow: [
      { title: "En Getsemaní", body: ["Jesús fue arrestado injustamente, pero no perdió la calma ni dejó de hacer la voluntad de Jehová.", "Oró, protegió a sus discípulos y mostró compasión aun con sus enemigos."] },
      { title: "Hoy", body: ["Podemos enfrentar presión, injusticias o miedo.", "Imitamos a Jesús cuando oramos primero, evitamos reaccionar mal y dejamos que Jehová nos guíe."] },
    ],
    lessons: [
      "La oración nos ayuda a aguantar cuando la presión es muy fuerte.",
      "Aceptar la voluntad de Jehová requiere humildad y confianza.",
      "Jesús no respondió con violencia, aunque lo trataron injustamente.",
      "La compasión de Jesús no desapareció ni en su peor noche.",
      "Un discípulo puede amar a Jesús y aun así necesitar corrección, como Pedro.",
    ],
    texts: [
      "Mateo 26:36-46 muestra la oración intensa de Jesús y la debilidad de los discípulos.",
      "Lucas 22:43 ayuda a ver que Jehová fortaleció a Jesús en un momento de angustia.",
      "Juan 18:4-9 muestra que Jesús protegió a sus discípulos durante el arresto.",
      "Mateo 26:52 enseña que los discípulos de Jesús no defienden la verdad con violencia.",
    ],
    guide: [
      "Empieza resaltando la presión emocional de Jesús, no solo el arresto.",
      "Haz que la congregación vea el contraste entre la reacción impulsiva de Pedro y la calma de Jesús.",
      "Cierra con la idea práctica: cuando llega la presión, primero oramos y después actuamos con calma.",
    ],
    application: [
      "Puedo orar antes de reaccionar.",
      "Puedo aceptar la voluntad de Jehová aunque no sea lo más fácil.",
      "Puedo mantener la calma cuando alguien me trata mal.",
      "Puedo demostrar compasión incluso en momentos de tensión.",
    ],
    jehova: [
      { title: "Jehová fortalece", body: "No quitó la prueba de inmediato, pero sostuvo a Jesús para que permaneciera fiel." },
      { title: "Jehová escucha", body: "Jesús pudo derramar su corazón ante su Padre en el momento más angustioso." },
      { title: "Jehová valora la obediencia", body: "La fidelidad de Jesús en Getsemaní demuestra obediencia completa y amor profundo." },
    ],
    finalTexts: [
      ["Mateo 26:36-57", "Relata la oración en Getsemaní, la llegada de Judas, la reacción de Pedro y el arresto."],
      ["Marcos 14:32-50", "Destaca la tristeza de Jesús, el sueño de los discípulos y la huida de los apóstoles."],
      ["Lucas 22:39-54", "Muestra la oración de Jesús, el fortalecimiento que recibió y la curación de Malco."],
      ["Juan 18:1-14, 19-24", "Presenta a Jesús enfrentando el arresto con calma y siendo llevado ante las autoridades religiosas."],
    ],
  },
  {
    id: "leccion-89",
    label: "Lección 89",
    roman: "lxxxix",
    title: "Pedro niega a Jesús",
    meta: ["Mateo 26:31-35, 57-27:2", "Lucas 22:55-71; Juan 18:15-18, 25-28", "PDF págs. 208-209"],
    indexLinks: [
      { id: "leccion-88", icon: "📖", title: "Lección 88", href: "/estudios-lfb/lfb-leccion-88.html?v=20260526-1#leccion-88" },
      { id: "leccion-89", icon: "📖", title: "Lección 89", href: "#leccion-89" },
    ],
    jumpLinks: [
      {
        label: "Anterior",
        title: "Lección 88",
        body: "Arrestan a Jesús",
        href: "/estudios-lfb/lfb-leccion-88.html?v=20260526-1#leccion-88",
        arrow: "←",
      },
    ],
    situarte: {
      when: "Casa de Caifás, durante la noche y la madrugada después del arresto de Jesús.",
      intro: [
        "La lección pone dos escenas una junto a la otra: afuera, Pedro tiene miedo y niega conocer a Jesús; adentro, Jesús enfrenta un juicio injusto con dignidad.",
        "Sirve para dirigir una conversación equilibrada: no para aplastar a Pedro, sino para aprender del peligro del miedo y del valor de arrepentirse.",
      ],
      characters: [
        { title: "Pedro", subtitle: "Apóstol que falla y llora", body: "Ama a Jesús, pero el miedo lo vence. Después recuerda las palabras de Jesús y llora amargamente." },
        { title: "Jesús", subtitle: "Fiel bajo juicio injusto", body: "No niega quién es y mantiene su dignidad aunque lo insultan y golpean." },
        { title: "Caifás", subtitle: "Sumo sacerdote", body: "Busca una razón para condenar a Jesús y usa el juicio para justificar una decisión ya tomada." },
        { title: "El Sanedrín", subtitle: "Tribunal religioso", body: "Ya quiere matar a Jesús y busca acusaciones contra él." },
        { title: "Sirvientas y presentes", subtitle: "Personas del patio", body: "Reconocen a Pedro como alguien relacionado con Jesús y aumentan la presión sobre él." },
        { title: "Jehová", subtitle: "Padre que no abandona", body: "Jesús puede decir que no está solo porque su Padre está con él." },
      ],
      scenario: [
        "Jesús ya fue arrestado y llevado a la casa de Caifás.",
        "Pedro entra al patio y se acerca al fuego para calentarse.",
        "Varias personas lo identifican como discípulo de Jesús, y Pedro lo niega tres veces.",
      ],
    },
    sequence: [
      ["Jesús advierte a Pedro", "Antes del arresto, Jesús le dice que lo negará tres veces antes de que cante un gallo."],
      ["Pedro entra al patio", "Sigue de lejos y se calienta junto al fuego en la casa de Caifás."],
      ["Primera negación", "Una sirvienta lo reconoce, pero Pedro niega conocer a Jesús."],
      ["Más presión", "Otras personas vuelven a relacionarlo con Jesús."],
      ["Tercera negación", "Pedro insiste en que no conoce a Jesús. Entonces canta el gallo."],
      ["Pedro llora", "Recuerda la advertencia de Jesús y sale profundamente dolido."],
      ["Juicio contra Jesús", "El Sanedrín acusa a Jesús de blasfemia porque él afirma ser el Hijo de Dios."],
    ],
    story: [
      "Todo empezó unas horas antes, en la habitación donde Jesús había comido la última cena con sus apóstoles. El ambiente era serio. Jesús les dijo que aquella noche todos lo abandonarían. Pedro no podía imaginarse haciendo eso. Con seguridad le dijo que, aunque otros lo dejaran, él nunca lo haría. Pero Jesús conocía el corazón de Pedro y también la presión que venía. Le advirtió que, antes de que cantara un gallo, diría tres veces que no lo conocía.",
      "Después del arresto, llevaron a Jesús a la casa de Caifás. La mayoría de los apóstoles ya había huido, pero Pedro y otro discípulo siguieron de lejos. Pedro logró entrar al patio y se acercó a un fuego para calentarse. La noche era fría, y la luz de las llamas le iluminó el rostro. Entonces una sirvienta lo miró y lo reconoció: él había estado con Jesús.",
      "La presión cayó sobre Pedro de golpe. En vez de decir que era discípulo de Jesús, lo negó. Se movió hacia la entrada, quizá tratando de pasar desapercibido, pero otra sirvienta lo señaló delante de los demás. Pedro volvió a negarlo. Luego otra persona insistió en que él era de los discípulos; hasta su manera de hablar lo delataba como galileo. Atrapado por el miedo, Pedro negó por tercera vez conocer a Jesús.",
      "En ese instante cantó un gallo. Y entonces pasó algo que debió atravesarle el corazón: Pedro vio que Jesús lo miraba. No fue necesario decir nada más. Pedro recordó la advertencia de su Maestro y entendió lo que acababa de hacer. Salió de allí y lloró profundamente. Su dolor mostraba que no quería alejarse de Jesús, pero esa noche el miedo lo había vencido.",
      "Mientras Pedro lloraba afuera, dentro de la casa los líderes religiosos buscaban cómo condenar a Jesús. Ya querían matarlo, pero necesitaban una acusación. Caifás le preguntó directamente si era el Hijo de Dios. Jesús no escondió la verdad ni trató de salvarse con una mentira. Respondió con dignidad, y ellos usaron sus palabras para acusarlo de blasfemia.",
      "Después lo trataron con crueldad: lo insultaron, lo golpearon y se burlaron de él. Al amanecer volvieron a interrogarlo, y otra vez Jesús se mantuvo firme. Finalmente lo llevaron al palacio del gobernador romano Poncio Pilato. La escena deja dos imágenes muy fuertes: Pedro llorando por su caída, y Jesús permaneciendo fiel aunque todos lo estaban presionando para condenarlo.",
    ],
    quote: "No es cierto.",
    questions: [
      {
        question: "¿Qué pasó en el patio de la casa de Caifás?",
        senas: "Hombre, Caifás, casa, ¿qué pasó?",
        answer: "Pedro estaba calentándose cerca del fuego cuando varias personas lo reconocieron como discípulo de Jesús. Por miedo, negó tres veces conocerlo. Entonces cantó el gallo, Pedro recordó lo que Jesús le había dicho y salió llorando amargamente.",
      },
      {
        question: "El tribunal condenó a muerte a Jesús, ¿por qué razón?",
        senas: "Ellos, sumo sacerdote, autoridad, tú, Jesucristo, castigo, morir. ¿Por qué?",
        answer: "Porque Jesús reconoció que era el Hijo de Dios. Los líderes religiosos lo acusaron de blasfemia, aunque en realidad ya estaban decididos a matarlo y solo buscaban una razón para condenarlo.",
      },
    ],
    meditate: [
      ["¿Qué nos enseña que Pedro estuviera tan seguro de que no iba a fallar?", "Nos enseña que las buenas intenciones no bastan. Pedro amaba a Jesús, pero necesitaba humildad, oración y reconocer que bajo presión cualquiera puede debilitarse."],
      ["¿Por qué creen que Pedro negó conocer a Jesús si en realidad lo amaba?", "Porque el miedo y la presión del momento lo dominaron. Esta pregunta ayuda al auditorio a ver que una persona fiel puede fallar si se confía demasiado o si intenta enfrentar la presión con sus propias fuerzas."],
      ["¿Qué diferencia vemos entre el corazón de Pedro y el de los líderes religiosos?", "Pedro cayó, pero reaccionó con dolor sincero. Los líderes religiosos, en cambio, estaban decididos a condenar a Jesús aunque no encontraban una acusación justa. Uno se quebró y podía recuperarse; los otros se endurecieron."],
      ["¿Qué nos enseña Jesús al decir la verdad aunque sabía que eso lo iba a poner en más peligro?", "Nos enseña fidelidad y dignidad. Jesús no negó quién era ni trató de salvarse con una mentira. Se mantuvo leal a Jehová aun cuando decir la verdad le costaría sufrir más."],
      ["¿Cómo puede ayudar esta historia a alguien que cometió un error y se siente muy mal?", "Le recuerda que fallar no tiene que ser el final. Pedro lloró porque su corazón seguía sensible. Si una persona se arrepiente de verdad y vuelve a Jehová, puede recibir ayuda y recuperarse."],
    ],
    meditateTitle: "Preguntas para el auditorio",
    keyText: {
      quote: "Aunque no estoy solo, porque el Padre está conmigo.",
      cite: "Juan 16:32",
      explanation: [
        "Este texto ayuda a ver qué sostenía a Jesús cuando todos lo abandonaron. No dependía de la aprobación humana para permanecer fiel.",
        "También consuela: aun si nos sentimos solos por hacer lo correcto, Jehová puede estar con nosotros.",
      ],
      support: {
        quote: "Antes de que un gallo cante, me negarás tres veces.",
        cite: "Mateo 26:34",
        explanation: "Este texto muestra que Jesús conocía la debilidad de Pedro. La caída no sorprendió a Jesús, y después Pedro pudo recuperarse.",
      },
    },
    principle: "La confianza en uno mismo puede fallar; la confianza humilde en Jehová nos ayuda a mantenernos fieles y a levantarnos si caemos.",
    thenNow: [
      { title: "En el patio", body: ["Pedro sintió miedo y negó a Jesús, aunque lo amaba.", "Cuando entendió lo que había hecho, no se justificó; lloró y mostró dolor sincero."] },
      { title: "Hoy", body: ["Podemos sentir presión para esconder que somos siervos de Jehová.", "La humildad nos ayuda a pedir fuerzas antes de fallar y a volver a Jehová si cometemos un error."] },
    ],
    lessons: [
      "El exceso de confianza puede ponernos en peligro.",
      "El miedo puede hacer que una persona fiel actúe mal si no busca ayuda de Jehová.",
      "El arrepentimiento sincero empieza cuando dejamos de justificarnos.",
      "Jesús fue fiel aunque lo acusaron injustamente.",
      "Jehová no abandona a sus siervos fieles cuando enfrentan presión.",
    ],
    texts: [
      "Mateo 26:31-35 muestra la advertencia de Jesús y la seguridad excesiva de Pedro.",
      "Lucas 22:61, 62 muestra el momento en que Pedro recuerda las palabras de Jesús y llora.",
      "Mateo 26:63-66 ayuda a explicar por qué el tribunal condenó a muerte a Jesús.",
      "Juan 16:32 destaca que Jesús podía sentirse abandonado por otros, pero no por Jehová.",
    ],
    guide: [
      "No presentes a Pedro como alguien malo. Presenta a un discípulo que amaba a Jesús, pero subestimó la presión.",
      "Marca el contraste entre el miedo de Pedro y la firmeza tranquila de Jesús.",
      "Cierra con esperanza: un error grave no tiene que ser el final si hay arrepentimiento sincero.",
    ],
    application: [
      "Puedo evitar confiar demasiado en mis propias fuerzas.",
      "Puedo pedirle a Jehová valor para identificarme como su siervo.",
      "Puedo arrepentirme rápido si fallo y no endurecerme.",
      "Puedo recordar que Jehová no me deja solo cuando hago lo correcto.",
    ],
    jehova: [
      { title: "Jehová no abandona", body: "Jesús podía decir que el Padre estaba con él aun cuando otros lo dejaron solo." },
      { title: "Jehová ve el corazón", body: "Pedro falló, pero su dolor mostró que no quería abandonar a Jesús de verdad." },
      { title: "Jehová permite recuperación", body: "La historia de Pedro prepara el camino para ver cómo Jesús restaura y usa a sus discípulos imperfectos." },
    ],
    finalTexts: [
      ["Mateo 26:31-35, 57-27:2", "Incluye la advertencia a Pedro, el juicio religioso y la entrega de Jesús a Pilato."],
      ["Marcos 14:27-31, 53-15:1", "Muestra la seguridad de Pedro, sus negaciones y la condena contra Jesús."],
      ["Lucas 22:55-71", "Relata el patio, el canto del gallo, el llanto de Pedro y el interrogatorio ante el tribunal."],
      ["Juan 13:36-38; 18:15-18, 25-28", "Conecta la advertencia de Jesús con las negaciones de Pedro y el traslado de Jesús."],
    ],
  },
];

const july14LessonStudies = [
  {
    id: "leccion-102",
    label: "Lección 102",
    roman: "",
    title: "Juan tiene una revelación",
    meta: ["Apocalipsis 1:1-3; 4:1-11; 7:4, 9-17", "PDF págs. 236-237", "16 visiones del futuro"],
    indexLinks: [
      { id: "leccion-102", icon: "📖", title: "Lección 102", href: "#leccion-102" },
      { id: "leccion-103", icon: "📖", title: "Lección 103", href: "/estudios-lfb/lfb-leccion-103.html?v=20260714-1#leccion-103" },
    ],
    jumpLinks: [
      {
        label: "Siguiente",
        title: "Lección 103",
        body: "Que venga tu Reino",
        href: "/estudios-lfb/lfb-leccion-103.html?v=20260714-1#leccion-103",
        arrow: "→",
      },
    ],
    situarte: {
      when: "Isla de Patmos, hacia finales del siglo primero.",
      intro: [
        "Juan está preso por mantenerse fiel y hablar de Dios. Aunque está aislado, Jesús le permite contemplar el desenlace del propósito de Jehová mediante una serie de visiones.",
        "La lección no intenta explicar cada símbolo de Apocalipsis. Presenta un recorrido sencillo por las imágenes principales y destaca que Jehová santificará su nombre, su Reino vencerá y su voluntad se hará en toda la creación.",
      ],
      characters: [
        { title: "Jehová", subtitle: "Soberano y centro de la adoración", body: "Aparece en su glorioso trono y recibe honra de toda su creación fiel." },
        { title: "Jesús", subtitle: "El Cordero y Rey", body: "Pastorea a la gran muchedumbre, gobierna y dirige la victoria contra el mundo de Satanás." },
        { title: "Juan", subtitle: "Testigo de las visiones", body: "Recibe el mensaje mientras está preso en Patmos y lo deja por escrito para fortalecer a los siervos de Dios." },
        { title: "Los 24 ancianos", subtitle: "Reyes y sacerdotes en el cielo", body: "Adoran a Jehová, gobiernan con Cristo y reconocen que toda autoridad procede de Dios." },
        { title: "La gran muchedumbre", subtitle: "Adoradores de todas las naciones", body: "Sirven a Jehová y reciben el cuidado del Cordero, que los guía al agua de vida." },
        { title: "Satanás, el Dragón", subtitle: "Enemigo derrotado", body: "Es expulsado del cielo y finalmente pierde para siempre su dominio y a quienes lo apoyan." },
      ],
      scenario: [
        "Juan está lejos de las congregaciones, pero Jehová no deja de usarlo ni de fortalecerlo.",
        "Las visiones cambian del trono celestial a la gran muchedumbre, el Reino, la guerra contra Satanás y la paz final.",
        "El relato comienza con oposición y prisión, pero termina con armonía, adoración pura y el nombre de Jehová santificado.",
      ],
    },
    sequence: [
      ["Juan recibe la revelación", "Jesús le muestra 16 visiones del futuro mientras está preso en Patmos."],
      ["El trono de Jehová", "Juan contempla la gloria de Jehová y a los 24 ancianos inclinándose ante él."],
      ["La gran muchedumbre", "Personas de todas las naciones adoran a Jehová y el Cordero las guía al agua de vida."],
      ["El Reino empieza a gobernar", "Jesús reina en el cielo con los 24 ancianos."],
      ["Satanás es expulsado", "Jesús combate al Dragón y sus demonios y los arroja a la Tierra."],
      ["El Cordero y los 144.000", "Juan los ve juntos en el monte Sion."],
      ["Una advertencia mundial", "Un ángel proclama que todos deben honrar a Dios y darle gloria."],
      ["La guerra de Armagedón", "Jesús y su ejército derrotan al mundo malvado de Satanás."],
      ["Armonía completa", "Satanás desaparece y toda la creación adora únicamente a Jehová en paz y unidad."],
    ],
    story: [
      "Juan llevaba muchos años sirviendo a Jehová. Ahora se encontraba preso y apartado en la isla de Patmos. Sus enemigos quizá pensaron que así lo silenciarían, pero Jesús lo puso frente a un panorama mucho mayor que aquella prisión: le mostró 16 visiones sobre el futuro.",
      "Primero, Juan contempló a Jehová en su glorioso trono. Había relámpagos, sonidos como truenos y 24 ancianos vestidos de blanco y coronados. A pesar de sus coronas, ninguno competía con Jehová. Todos se inclinaban y lo adoraban, dejando claro quién merece la honra y de quién procede toda autoridad.",
      "Después apareció una gran muchedumbre formada por personas de todas las naciones, pueblos e idiomas. No estaban perdidas ni abandonadas. Jesús, presentado como el Cordero, las cuidaba como un pastor y las llevaba al agua de vida. La visión mostraba que el propósito de Jehová incluye personas de toda procedencia.",
      "Juan también vio que Jesús empezaba a gobernar como Rey y que estallaba una guerra en el cielo. El Dragón, Satanás, y sus demonios fueron expulsados. Aunque eso traería dificultades temporales a la Tierra, la visión garantizaba que Satanás ya era un enemigo derrotado y con tiempo limitado.",
      "Más adelante, Juan vio al Cordero con los 144.000 en el monte Sion y oyó un anuncio que recorría la Tierra: había que honrar a Dios y darle gloria. Jehová no ejecutaría su juicio sin advertir; daría a las personas la oportunidad de reconocer su soberanía.",
      "Finalmente llegó Armagedón. Jesús y su ejército vencieron por completo al mundo de Satanás. La última escena no quedó dominada por la guerra, sino por su resultado: Satanás y quienes lo siguen desaparecen, el cielo y la Tierra viven en armonía y todos tratan el nombre de Jehová como santo.",
    ],
    quote: "El final de las visiones no es caos: es adoración pura, paz y unidad.",
    questions: [
      {
        question: "¿Cuántas visiones ve Juan?",
        answer: "Juan ve 16 visiones o imágenes del futuro. En conjunto muestran cómo Jehová santificará su nombre, cómo gobernará su Reino y cómo se hará su voluntad tanto en el cielo como en la Tierra.",
      },
      {
        question: "¿Qué va a hacer Jesús en la guerra de Armagedón?",
        answer: "Jesús y su ejército vencerán al mundo malvado de Satanás. Así eliminarán la oposición al gobierno de Jehová y abrirán el camino para que haya paz y adoración pura en toda la creación.",
      },
    ],
    meditateTitle: "Preguntas para el auditorio",
    meditate: [
      ["¿Qué nos enseña que los 24 ancianos se inclinen delante de Jehová aunque llevan coronas?", "Que cualquier autoridad que tengan procede de Jehová. No compiten con él ni buscan gloria propia; reconocen con humildad que solo Jehová merece la adoración suprema."],
      ["¿Por qué es animador que la gran muchedumbre proceda de todas las naciones, pueblos e idiomas?", "Porque el Reino no beneficia a una sola cultura o grupo. Jehová reúne a personas muy diferentes y las une en la adoración verdadera."],
      ["¿Qué aprendemos de que Jesús sea Rey y al mismo tiempo pastor de la gran muchedumbre?", "Que su gobierno no será frío ni distante. Jesús tiene poder para gobernar, pero también interés personal, ternura y capacidad para guiar a sus súbditos a la vida."],
      ["¿Qué revela de Jehová que un ángel anuncie por toda la Tierra que hay que honrarlo antes de Armagedón?", "Revela justicia y misericordia. Jehová da advertencia y oportunidad para cambiar; su juicio no llega sin que antes se proclame claramente quién merece la adoración."],
      ["¿Cómo conecta Génesis 3:15 con el desenlace de las visiones?", "La primera profecía prometió que la descendencia aplastaría la cabeza de la serpiente. Apocalipsis muestra a Jesús completando esa victoria al eliminar a Satanás y todo su dominio."],
    ],
    keyText: {
      quote: "Él te aplastará la cabeza, y tú le herirás el talón.",
      cite: "Génesis 3:15",
      explanation: [
        "Esta promesa fue dada al principio de la historia humana. Las visiones de Juan muestran su desenlace: Jesús, la descendencia prometida, derrota por completo a Satanás.",
        "El talón herido indica un daño temporal; la cabeza aplastada representa una derrota definitiva. Por eso el final de Apocalipsis transmite seguridad, no incertidumbre.",
      ],
      support: {
        quote: "¡Mira! Estoy haciendo nuevas todas las cosas.",
        cite: "Apocalipsis 21:5",
        explanation: "Jehová no se limita a poner fin a la maldad. Promete renovar por completo la vida humana y cumplir su propósito original.",
      },
    },
    principle: "Jehová nos revela el desenlace para que las pruebas presentes no oculten la certeza de la victoria de su Reino.",
    thenNow: [
      { title: "Juan en Patmos", body: ["Parecía aislado y limitado por la prisión.", "Las visiones le permitieron ver que el propósito de Jehová avanzaba hacia una victoria segura."] },
      { title: "Nosotros hoy", body: ["Podemos sentir presión o ver un mundo dominado por la maldad.", "Apocalipsis nos ayuda a mirar más allá del presente y apoyar con confianza el Reino de Jehová."] },
    ],
    lessons: [
      "Jehová merece toda honra, incluso de quienes reciben autoridad celestial.",
      "Jesús gobierna con poder y cuida con ternura como pastor.",
      "La adoración verdadera une a personas de todas las naciones.",
      "Satanás es un enemigo peligroso, pero ya está condenado a una derrota definitiva.",
      "Jehová advierte antes de actuar y da oportunidad para responder.",
      "Armagedón no es el final del propósito de Dios, sino el paso hacia paz y armonía completas.",
    ],
    texts: [
      "Apocalipsis 4:1-11 centra la atención en el trono de Jehová y en la adoración que él merece.",
      "Apocalipsis 7:9-17 muestra una gran muchedumbre internacional bajo el cuidado del Cordero.",
      "Apocalipsis 12:5-12 explica el comienzo del gobierno de Cristo y la expulsión de Satanás del cielo.",
      "Apocalipsis 14:6, 7 presenta el anuncio mundial de honrar a Dios antes de su juicio.",
      "Apocalipsis 16:14, 16 identifica Armagedón como la confrontación final contra la oposición a Jehová.",
    ],
    guide: [
      "Sigue el orden de las imágenes y evita perderte en detalles simbólicos que la lección no desarrolla.",
      "Haz que el auditorio vea el contraste: Juan está preso, pero el Reino que contempla no puede ser detenido.",
      "Presenta Armagedón dentro del hilo completo: Jehová advierte, Jesús vence y después llega la armonía.",
      "Cierra conectando la victoria de Jesús con la promesa de Génesis 3:15.",
    ],
    application: [
      "Puedo mantener la calma cuando el mundo parece fuera de control.",
      "Puedo demostrar ahora que el nombre de Jehová es santo mediante mi conducta y adoración.",
      "Puedo apoyar el anuncio mundial de honrar a Dios.",
      "Puedo tratar con amor a hermanos de otras culturas porque Jehová ya nos ve como una sola gran familia.",
    ],
    jehova: [
      { title: "Jehová es el Soberano", body: "Su trono permanece firme y toda autoridad legítima procede de él." },
      { title: "Jehová es inclusivo", body: "Invita a personas de todas las naciones, pueblos e idiomas a adorarlo." },
      { title: "Jehová es justo", body: "Advierte antes de ejecutar su juicio y elimina para siempre la maldad." },
      { title: "Jehová cumple sus promesas", body: "La profecía de Génesis 3:15 llega a su cumplimiento completo mediante Jesús." },
    ],
    connection: [
      "La lección 101 terminó con Pablo predicando pese a los obstáculos. La lección 102 muestra que la obra que él apoyó conduce a una gran muchedumbre internacional.",
      "La lección 102 presenta el desenlace en visiones; la lección 103 acerca ese desenlace a la vida diaria y describe cómo será la Tierra bajo el Reino.",
    ],
    source: {
      href: "https://www.jw.org/es/biblioteca/libros/lecciones-historias-biblia/14/libro-apocalipsis-juan-revelacion/",
      label: "Lección 102 en JW.org",
    },
    finalTexts: [
      ["Apocalipsis 1:1-3", "Presenta la revelación que Dios da por medio de Jesucristo y la bendición de prestar atención a su mensaje."],
      ["Apocalipsis 4:1-11", "Muestra el trono de Jehová y la adoración de los 24 ancianos."],
      ["Apocalipsis 7:4, 9-17", "Distingue a los 144.000 y a la gran muchedumbre cuidada por el Cordero."],
      ["Apocalipsis 11:15-18; 12:5-12", "Describe el gobierno del Reino y la expulsión de Satanás del cielo."],
      ["Apocalipsis 14:6, 7; 16:14, 16", "Conecta la advertencia mundial con la guerra de Armagedón."],
      ["Apocalipsis 21:5", "Garantiza que Jehová renovará todas las cosas después de eliminar la oposición."],
    ],
  },
  {
    id: "leccion-103",
    label: "Lección 103",
    roman: "",
    title: "Que venga tu Reino",
    meta: ["Apocalipsis 21:3, 4", "PDF págs. 238-239", "El propósito de Jehová cumplido"],
    indexLinks: [
      { id: "leccion-102", icon: "📖", title: "Lección 102", href: "/estudios-lfb/lfb-leccion-102.html?v=20260714-1#leccion-102" },
      { id: "leccion-103", icon: "📖", title: "Lección 103", href: "#leccion-103" },
    ],
    jumpLinks: [
      {
        label: "Anterior",
        title: "Lección 102",
        body: "Juan tiene una revelación",
        href: "/estudios-lfb/lfb-leccion-102.html?v=20260714-1#leccion-102",
        arrow: "←",
      },
    ],
    situarte: {
      when: "El cierre del libro, desde el propósito original de Edén hasta la vida futura bajo el Reino.",
      intro: [
        "La última lección reúne el hilo de todo el libro. Empieza con la vida que Jehová quería para Adán y Eva y termina mostrando que la desobediencia humana no ha cambiado ese propósito.",
        "No es solo una descripción bonita del Paraíso. Es una invitación a acercarnos a Jehová ahora para formar parte del mundo que su Reino hará realidad.",
      ],
      characters: [
        { title: "Jehová", subtitle: "Creador que cumple lo que promete", body: "Mantiene intacto su propósito para la Tierra y elimina para siempre el sufrimiento." },
        { title: "Jesús", subtitle: "Rey del Reino de Dios", body: "Gobierna hasta quitar la oposición y llevar a la humanidad obediente a la vida que Jehová quiso desde el principio." },
        { title: "La humanidad obediente", subtitle: "Una familia mundial", body: "Adora unida a Jehová, disfruta de paz y participa en convertir toda la Tierra en un paraíso." },
        { title: "Los resucitados", subtitle: "Personas que vuelven a vivir", body: "Reciben la bienvenida y la oportunidad de conocer a Jehová y vivir en una Tierra restaurada." },
        { title: "Satanás y la gente mala", subtitle: "Oposición eliminada", body: "Ya no pueden causar dolor, engaño ni violencia." },
      ],
      scenario: [
        "El relato mira hacia atrás al jardín de Edén y recuerda el propósito original de Jehová.",
        "Después contempla una Tierra sin Satanás, enfermedad, muerte, violencia ni miedo.",
        "La escena final está llena de hogares, alimento, trabajo significativo, resurrecciones, aprendizaje y amistad eterna con Jehová.",
      ],
    },
    sequence: [
      ["El propósito original", "Jehová coloca a Adán y Eva en Edén para que formen una familia y extiendan el paraíso."],
      ["La rebelión no cambia el propósito", "Adán y Eva desobedecen, pero Jehová mantiene lo que se propuso para la Tierra."],
      ["El Reino elimina la oposición", "Satanás, sus demonios y la gente malvada dejan de existir."],
      ["Adoración unida", "Todos los habitantes de la Tierra reconocen a Jehová como su Dios."],
      ["Salud y vida", "Desaparecen la enfermedad, la vejez, el dolor y la muerte."],
      ["La Tierra se vuelve un paraíso", "Hay alimento, hogares seguros, personas buenas y paz entre humanos y animales."],
      ["La resurrección", "Personas de todas las épocas vuelven a la vida y reciben una bienvenida afectuosa."],
      ["Una vida llena de propósito", "Todos aprenden, trabajan juntos y siguen acercándose a Jehová para siempre."],
    ],
    story: [
      "La última lección vuelve al principio. Jehová creó la Tierra para que fuera un hogar lleno de vida y puso a Adán y Eva en un jardín hermoso. Quería que lo adoraran, formaran una familia y extendieran aquel paraíso. Ellos desobedecieron, pero su fracaso no obligó a Jehová a abandonar su propósito.",
      "A lo largo del libro vimos que Jehová siempre encuentra la manera de cumplir lo que promete. El Reino en manos de Jesús es el medio que llevará el propósito de Edén a toda la Tierra. Cuando ese gobierno complete su labor, Satanás, sus demonios y quienes insisten en hacer el mal ya no estarán presentes para causar daño.",
      "La vida diaria cambiará por completo. Nadie se despertará enfermo, débil o temiendo la muerte. Las personas tendrán energía, seguridad, alimento y hogares agradables. La bondad sustituirá a la crueldad, y ni los humanos ni los animales vivirán dominados por el miedo.",
      "Uno de los momentos más emocionantes será la resurrección. Las familias recibirán de nuevo a sus seres queridos y conoceremos a siervos de Jehová de otras épocas. Abel, Noé, Abrahán, Sara, Moisés, Rut, Ester, David y muchísimos más podrán contar lo que vivieron y aprender lo que Jehová hizo después de su muerte.",
      "Convertir toda la Tierra en un paraíso será una labor alegre. Habrá proyectos, descubrimientos, conversaciones y muchas cosas útiles que hacer. La vida eterna no será una existencia vacía o repetitiva; siempre habrá más que aprender sobre la creación y sobre la personalidad de Jehová.",
      "La lección termina dirigiendo la atención al presente. Jehová quiere que vivamos allí, pero la amistad con él no empieza en el Paraíso. Empieza ahora, cuando aprendemos a confiar en su Reino, obedecemos sus consejos y nos acercamos a él cada día.",
    ],
    quote: "El propósito de Jehová no cambió: su Reino hará de toda la Tierra un hogar lleno de vida, paz y adoración verdadera.",
    questions: [
      {
        question: "¿Cómo será la vida en la Tierra con el Reino de Dios?",
        answer: "Será una vida segura, saludable y llena de propósito. No habrá enfermedad, dolor, muerte, violencia ni miedo. Habrá buenos hogares, alimento, paz entre personas y animales, resurrecciones y la alegría de aprender acerca de Jehová para siempre.",
      },
      {
        question: "De todas las personas de las que hemos leído en este libro, ¿a quién te gustaría conocer en el Paraíso?",
        answer: "No hay una sola respuesta correcta. Cada persona puede elegir a alguien y explicar por qué. Por ejemplo, sería emocionante hablar con Noé sobre el arca, con Sara sobre su fe, con Moisés sobre el mar Rojo o con Rut sobre su lealtad.",
      },
    ],
    meditateTitle: "Preguntas para el auditorio",
    meditate: [
      ["¿Qué nos enseña sobre Jehová que la rebelión de Adán y Eva no cambiara su propósito?", "Que Jehová es constante y todopoderoso. Los errores humanos pueden causar retrasos y sufrimiento, pero nunca pueden obligarlo a renunciar a lo que ha prometido."],
      ["¿Por qué la esperanza del Paraíso es más que tener una casa bonita y buena salud?", "Porque el centro de esa vida será la amistad con Jehová y la adoración unida. Las bendiciones materiales serán preciosas, pero lo mejor será vivir en paz con nuestro Creador y con toda su familia."],
      ["¿Cómo imaginan que la resurrección fortalecerá la unidad entre personas de épocas y culturas diferentes?", "Todos tendrán que aprender unos de otros y recibir enseñanza sobre Jehová. La resurrección convertirá la historia bíblica en relaciones personales y mostrará que somos una sola familia humana."],
      ["¿Qué clase de trabajo habrá cuando la Tierra se convierta en un paraíso?", "Será trabajo útil, seguro y satisfactorio: construir, cultivar, enseñar, recibir a los resucitados, cuidar la creación y aprender. No estará marcado por explotación, frustración o miedo."],
      ["¿Por qué la lección termina invitándonos a acercarnos a Jehová desde ahora?", "Porque no basta con desear las bendiciones futuras. Jehová quiere amigos que lo amen. Las decisiones de hoy demuestran si de verdad queremos que su Reino nos gobierne."],
    ],
    keyText: {
      quote: "Tú mereces recibir la gloria, la honra y el poder, porque tú creaste todas las cosas.",
      cite: "Apocalipsis 4:11",
      explanation: [
        "Jehová merece gobernar porque es el Creador y la fuente de toda vida. El Paraíso no será simplemente un proyecto humano de mejora; será el cumplimiento de la voluntad del Dueño legítimo de la Tierra.",
        "Dar gloria a Jehová incluye reconocer que sus normas y su gobierno son los que producirán la vida que todos deseamos.",
      ],
      support: {
        quote: "Que venga tu Reino. Que se haga tu voluntad [...] en la tierra.",
        cite: "Mateo 6:10",
        explanation: "Cada vez que hacemos esta petición, pedimos que el Reino elimine la oposición y extienda a toda la Tierra las condiciones que Jehová quiso desde Edén.",
      },
    },
    principle: "El Reino de Dios cumplirá sin falta el propósito original de Jehová y dará vida eterna a quienes escogen su amistad y su gobierno.",
    thenNow: [
      { title: "La vida bajo este sistema", body: ["La enfermedad, el duelo, la inseguridad y la injusticia parecen inevitables.", "La creación sufre las consecuencias de la rebelión y del mal gobierno humano."] },
      { title: "La vida bajo el Reino", body: ["La salud, la paz y la seguridad serán normales, no excepciones.", "Toda actividad humana estará en armonía con Jehová, con los demás y con la creación."] },
    ],
    lessons: [
      "Jehová nunca abandona un propósito porque los humanos fallen.",
      "El Reino es un gobierno real que transformará las condiciones de la Tierra.",
      "La vida eterna incluirá salud, seguridad, trabajo significativo y aprendizaje continuo.",
      "La resurrección reparará pérdidas que ahora parecen irreversibles.",
      "La paz abarcará las relaciones humanas y el cuidado de los animales.",
      "La mayor bendición del Paraíso será conocer cada vez mejor a Jehová.",
      "La preparación para esa vida comienza con las decisiones que tomamos hoy.",
    ],
    texts: [
      "Apocalipsis 21:3, 4 garantiza que Jehová quitará las causas del llanto, el dolor y la muerte.",
      "Job 33:25 describe la recuperación de la fuerza y la salud de la juventud.",
      "Proverbios 2:21, 22 muestra que las personas rectas permanecerán en la Tierra.",
      "Isaías 11:2-10 presenta paz, justicia y seguridad incluso entre humanos y animales.",
      "Isaías 65:21 explica que las personas construirán casas y disfrutarán de ellas.",
      "Juan 5:28, 29 confirma que los muertos oirán la voz de Jesús y saldrán de las tumbas.",
      "Juan 17:3 identifica conocer a Jehová y a Jesús como el camino a la vida eterna.",
    ],
    guide: [
      "Empieza recordando Edén para que el Paraíso se vea como el propósito original de Jehová, no como una idea añadida al final.",
      "Permite que la segunda pregunta sea personal: pide no solo un nombre, sino también qué le gustaría preguntarle a esa persona.",
      "No enfoques todo en comodidades. Destaca adoración, amistad con Jehová, resurrección, trabajo y aprendizaje.",
      "Cierra llevando la esperanza al presente: acercarnos a Jehová ahora es la mejor preparación para vivir bajo su Reino.",
    ],
    application: [
      "Puedo hacer más real el Paraíso meditando en detalles respaldados por los textos bíblicos.",
      "Puedo hablar de la esperanza del Reino con entusiasmo y sencillez.",
      "Puedo practicar ahora la bondad, la paz y el cuidado de la creación que caracterizarán el nuevo mundo.",
      "Puedo fortalecer cada día mi amistad con Jehová mediante oración, estudio y obediencia.",
    ],
    jehova: [
      { title: "Jehová es fiel", body: "La desobediencia de Adán y Eva no cambió lo que él quiere para la humanidad y la Tierra." },
      { title: "Jehová es generoso", body: "Promete salud, seguridad, alimento, hogares, paz y una vida llena de cosas interesantes." },
      { title: "Jehová repara las pérdidas", body: "Mediante la resurrección devolverá la vida y reunirá a familias y amigos." },
      { title: "Jehová quiere nuestra amistad", body: "No solo quiere que disfrutemos de sus regalos; nos invita a acercarnos a él para siempre." },
    ],
    connection: [
      "La lección 102 termina con las visiones de paz y adoración pura. La lección 103 desarrolla cómo se sentirá esa realidad en la vida cotidiana sobre la Tierra.",
      "Como cierre del libro, la lección 103 vuelve a Edén y une todas las historias anteriores con una sola conclusión: Jehová cumple sus promesas mediante su Reino.",
    ],
    source: {
      href: "https://www.jw.org/es/biblioteca/libros/lecciones-historias-biblia/14/venga-reino-paraiso/",
      label: "Lección 103 en JW.org",
    },
    finalTexts: [
      ["Apocalipsis 21:3, 4", "Describe a Dios con la humanidad y la desaparición de la muerte, el duelo, el clamor y el dolor."],
      ["Job 33:25; Isaías 33:24", "Apoyan la promesa de salud completa y fuerzas renovadas."],
      ["Proverbios 2:21, 22; Isaías 65:21", "Relacionan la rectitud con vivir en la Tierra y disfrutar de hogares seguros."],
      ["Isaías 11:2-10", "Presenta el gobierno justo del Mesías y la paz que alcanza incluso al mundo animal."],
      ["Mateo 6:9, 10", "Muestra que la venida del Reino santificará el nombre de Jehová y hará su voluntad en la Tierra."],
      ["Juan 5:28, 29", "Confirma la futura resurrección de quienes están en las tumbas."],
      ["Juan 17:3", "Explica que la vida eterna está ligada a conocer a Jehová y a Jesucristo."],
    ],
  },
];

const list = (items) => `<ul class="study-list">${items.map((item) => `<li>${e(item)}</li>`).join("\n")}</ul>`;

const lessonJumpLinks = (lesson) => {
  if (!lesson.jumpLinks?.length) return "";

  return `
    <div class="study-part lesson-jump">
      <h4>Continuar el estudio</h4>
      <div class="lesson-jump-grid">
${lesson.jumpLinks.map(({ label, title, body, href, arrow }) => `        <a class="lesson-jump-link" href="${e(href)}">
          <div class="lesson-jump-copy">
            <small>${e(label)}</small>
            <strong>${e(title)}</strong>
${body ? `            <span>${e(body)}</span>\n` : ""}          </div>
          <span class="lesson-jump-arrow" aria-hidden="true">${e(arrow || "→")}</span>
        </a>`).join("\n")}
      </div>
    </div>`;
};

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
          ${lesson.questions.map((item) => `<article><strong>${e(item.question)}</strong>${item.senas ? `<div class="question-sign"><em>Señas</em><span>${e(item.senas)}</span></div>` : ""}<p>${e(item.answer)}</p></article>`).join("\n")}
        </div>
      </div>
      <div class="study-part">
        <h4>5. ${e(lesson.meditateTitle || "Preguntas para meditar")}</h4>
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
${lesson.connection ? `      <div class="study-part">
        <h4>14. Conexión con lecciones cercanas</h4>
        ${p(lesson.connection)}
      </div>
` : ""}      <div class="study-part">
        <h4>${lesson.connection ? "15" : "14"}. Explicación de los textos bíblicos</h4>
        <div class="final-texts">
          ${lesson.finalTexts.map(([ref, body]) => `<div class="final-block"><div><span class="ref">${e(ref)}</span><p>${e(body)}</p></div></div>`).join("\n")}
        </div>
${lesson.source ? `        <p class="source-note">Fuente principal: <a href="${e(lesson.source.href)}">${e(lesson.source.label)}</a>.</p>
` : ""}      </div>
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
  roman: lesson.roman || (lesson.label.includes("86") ? "lxxxvi" : "lxxxvii"),
  subtitle: `Estudio completo de ${lesson.label.toLowerCase()}, con el mismo formato de preparación para dirigir y repasar.`,
  meta: lesson.meta,
  nav: lesson.indexLinks?.map(({ id, icon, title, href }) => [id, "", icon, title, href]) || [[lesson.id, "i", "📖", lesson.label]],
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
    ${lessonStudyBlock(lesson)}${lessonJumpLinks(lesson)}
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

const combinedLessonsContent = (lessons) => `
<section>
  <div class="story">
    <div class="ornament">❦</div>
    ${lessons.map(lessonStudyBlock).join("\n")}
    <p class="closing">Estas dos lecciones ayudan a dirigir el estudio con un hilo claro: Jesús ora y permanece fiel bajo presión, Pedro cae por miedo, y Jehová sigue sosteniendo a los que confían humildemente en él.</p>
    <div class="ornament">❦</div>
  </div>
</section>`;

const renderShell = ({ style, script, page = study, content = renderSections(), footerText }) => {
  const pageNav = page.nav || study.nav;
  const footer = footerText || "Jehová no solo puede vencer la muerte; también nos enseña a vivir con amor, humildad y unidad.<br />\n    Guía preparada para dirigir el Estudio Bíblico de la Congregación.";
  const pageStyle = content.includes("question-sign") ? `${style}\n${questionSignStyle}` : style;

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
  <style>${pageStyle}</style>
</head>
<body>
  <div id="progressBar"></div>
  <a class="app-back" href="/" aria-label="Volver a la aplicación"><span>←</span> App</a>
  <button class="nav-toggle" id="openNav" aria-label="Abrir índice">☰</button>
  <div class="overlay" id="overlay"></div>
  <nav class="side-nav" id="sideNav" aria-label="Índice del estudio">
    <div class="side-head"><h3>Índice</h3><button class="close" id="closeNav" aria-label="Cerrar índice">×</button></div>
    ${pageNav.map(([id, , icon, title, href]) => `<a href="${e(href || `#${id}`)}">${e(icon)} ${e(title)}</a>`).join("\n    ")}
  </nav>
  <button class="top-btn" id="topBtn" aria-label="Volver arriba">↑</button>

  <header class="hero" id="top">
    <div class="wrap">
      <div class="hero-card">
        <div class="eyebrow">${e(page.eyebrow)}</div>
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
    ["¿Qué revela de Jesús que primero llorara con sus amigos antes de resolver el problema?", "Revela que Jesús no consuela desde lejos. Aunque sabía que iba a resucitar a Lázaro, se detuvo a sentir el dolor de sus amigos. Eso me ayuda a consolar con ternura antes de tratar de explicar o resolver."],
    ["Cuando Jehová parece tardar, ¿qué sale a la luz sobre mi confianza en él?", "Sale a la luz si confío solo cuando la respuesta llega rápido o si sigo creyendo que Jehová ve más que yo. La espera puede revelar y fortalecer mi fe."],
    ["¿Qué me enseña la actitud de los fariseos sobre el peligro de tener el corazón cerrado aun viendo pruebas?", "Que ver pruebas no basta si el orgullo domina el corazón. Necesito mantenerme humilde, dispuesto a dejarme corregir y a alegrarme cuando Jehová actúa."],
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
    [`${studyMay26.slug}.html`, renderShell({
      style,
      script,
      page: studyMay26,
      content: combinedLessonsContent(may26LessonStudies),
      footerText: "Guía preparada para dirigir el Estudio Bíblico de la Congregación de las lecciones 88 y 89.",
    })],
    ["lfb-leccion-88.html", renderShell({
      style,
      script,
      page: lessonPage(may26LessonStudies[0]),
      content: standaloneLessonContent(may26LessonStudies[0]),
      footerText: "Guía preparada para estudiar y dirigir la Lección 88.",
    })],
    ["lfb-leccion-89.html", renderShell({
      style,
      script,
      page: lessonPage(may26LessonStudies[1]),
      content: standaloneLessonContent(may26LessonStudies[1]),
      footerText: "Guía preparada para estudiar y dirigir la Lección 89.",
    })],
    ["lfb-leccion-102.html", renderShell({
      style,
      script,
      page: lessonPage(july14LessonStudies[0]),
      content: standaloneLessonContent(july14LessonStudies[0]),
      footerText: "Guía preparada para estudiar y dirigir la Lección 102.",
    }).replace(/[ \t]+$/gm, "")],
    ["lfb-leccion-103.html", renderShell({
      style,
      script,
      page: lessonPage(july14LessonStudies[1]),
      content: standaloneLessonContent(july14LessonStudies[1]),
      footerText: "Guía preparada para estudiar y dirigir la Lección 103.",
    }).replace(/[ \t]+$/gm, "")],
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
