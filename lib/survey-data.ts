// ── PSS-14 ────────────────────────────────────────────────────────────────────

export interface PSSItem {
  id: number;
  text: string;
  inverse: boolean;
}

export const PSS_ITEMS: PSSItem[] = [
  { id: 1,  text: "En el último mes, ¿con qué frecuencia ha estado afectado/a por algo que ha ocurrido inesperadamente?", inverse: false },
  { id: 2,  text: "En el último mes, ¿con qué frecuencia se ha sentido incapaz de controlar las cosas importantes en su vida?", inverse: false },
  { id: 3,  text: "En el último mes, ¿con qué frecuencia se ha sentido nervioso/a o estresado/a?", inverse: false },
  { id: 4,  text: "En el último mes, ¿con qué frecuencia ha manejado con éxito los pequeños problemas irritantes de la vida?", inverse: true },
  { id: 5,  text: "En el último mes, ¿con qué frecuencia ha sentido que ha afrontado efectivamente los cambios importantes que han estado ocurriendo en su vida?", inverse: true },
  { id: 6,  text: "En el último mes, ¿con qué frecuencia ha estado seguro/a sobre su capacidad para manejar sus problemas personales?", inverse: true },
  { id: 7,  text: "En el último mes, ¿con qué frecuencia ha sentido que las cosas le van bien?", inverse: true },
  { id: 8,  text: "En el último mes, ¿con qué frecuencia ha sentido que no podía afrontar todas las cosas que tenía que hacer?", inverse: false },
  { id: 9,  text: "En el último mes, ¿con qué frecuencia ha podido controlar las dificultades de su vida?", inverse: true },
  { id: 10, text: "En el último mes, ¿con qué frecuencia se ha sentido al control de todo?", inverse: true },
  { id: 11, text: "En el último mes, ¿con qué frecuencia ha estado enfadado/a porque las cosas que le han ocurrido estaban fuera de su control?", inverse: false },
  { id: 12, text: "En el último mes, ¿con qué frecuencia ha pensado sobre las cosas que le quedan por lograr?", inverse: false },
  { id: 13, text: "En el último mes, ¿con qué frecuencia ha podido controlar la forma de pasar el tiempo?", inverse: true },
  { id: 14, text: "En el último mes, ¿con qué frecuencia ha sentido que las dificultades se acumulan tanto que no puede superarlas?", inverse: false },
];

export const PSS_LABELS = ["Nunca", "Casi nunca", "De vez en cuando", "A menudo", "Muy a menudo"];

// ── DASS-21 ───────────────────────────────────────────────────────────────────

export type DASSSubscale = "depression" | "anxiety" | "stress";

export interface DASSItem {
  id: number;
  text: string;
  subscale: DASSSubscale;
}

export const DASS_ITEMS: DASSItem[] = [
  { id: 1,  text: "Me ha costado mucho descargarme o relajarme",                                                                                                    subscale: "stress" },
  { id: 2,  text: "Me he dado cuenta que tenía la boca seca",                                                                                                       subscale: "anxiety" },
  { id: 3,  text: "No he podido sentir ningún sentimiento positivo",                                                                                                subscale: "depression" },
  { id: 4,  text: "He tenido dificultad para respirar (p. ej., respiración excesivamente rápida o falta de aliento sin haber realizado ningún esfuerzo físico)",    subscale: "anxiety" },
  { id: 5,  text: "Me ha sido difícil tener iniciativa para hacer cosas",                                                                                           subscale: "depression" },
  { id: 6,  text: "He reaccionado exageradamente en ciertas situaciones",                                                                                           subscale: "stress" },
  { id: 7,  text: "He sentido temblores (p. ej., en las manos)",                                                                                                    subscale: "anxiety" },
  { id: 8,  text: "He sentido que estaba usando mucha energía",                                                                                                     subscale: "stress" },
  { id: 9,  text: "Me he preocupado por situaciones en las que podría entrar en pánico y hacer el ridículo",                                                        subscale: "anxiety" },
  { id: 10, text: "He sentido que no tenía nada que esperar",                                                                                                       subscale: "depression" },
  { id: 11, text: "Me he sentido agitado/a",                                                                                                                        subscale: "stress" },
  { id: 12, text: "Me ha sido difícil relajarme",                                                                                                                   subscale: "stress" },
  { id: 13, text: "Me he sentido desanimado/a y triste",                                                                                                            subscale: "depression" },
  { id: 14, text: "No he tolerado nada que me impidiera continuar con lo que estaba haciendo",                                                                      subscale: "stress" },
  { id: 15, text: "He sentido que estaba al punto de pánico",                                                                                                       subscale: "anxiety" },
  { id: 16, text: "No me he podido entusiasmar con nada",                                                                                                           subscale: "depression" },
  { id: 17, text: "He sentido que valía muy poco como persona",                                                                                                     subscale: "depression" },
  { id: 18, text: "He sentido que estaba bastante irritable",                                                                                                       subscale: "stress" },
  { id: 19, text: "He sentido los latidos de mi corazón sin haber realizado ningún esfuerzo físico",                                                                subscale: "anxiety" },
  { id: 20, text: "He tenido miedo sin motivo",                                                                                                                     subscale: "anxiety" },
  { id: 21, text: "He sentido que la vida no tenía ningún sentido",                                                                                                 subscale: "depression" },
];

export const DASS_LABELS = [
  "No me ha ocurrido",
  "Me ha ocurrido algo, o algunas veces",
  "Me ha ocurrido bastante, o con bastante frecuencia",
  "Me ha ocurrido mucho, o con mucha frecuencia",
];

// ── DEMOGRAPHIC OPTIONS ───────────────────────────────────────────────────────

export const SEX_OPTIONS = ["Hombre", "Mujer", "Otro / Prefiero no decir"];

export const EDUCATION_OPTIONS = [
  "Sin estudios",
  "Estudios primarios",
  "ESO / Bachillerato / FP",
  "Universitarios (grado/licenciatura)",
  "Posgrado (máster/doctorado)",
];

export const EMPLOYMENT_OPTIONS = [
  "Empleado/a por cuenta ajena",
  "Empleado/a por cuenta propia / autónomo",
  "Desempleado/a",
  "Estudiante",
  "Jubilado/a o pensionista",
  "Trabajo doméstico no remunerado",
  "Baja laboral / incapacidad",
];

export const EMPLOYED_STATUSES = [
  "Empleado/a por cuenta ajena",
  "Empleado/a por cuenta propia / autónomo",
];

export const SECTOR_OPTIONS = [
  "Sanidad y servicios sociales",
  "Educación",
  "Fuerzas Armadas / Cuerpos de Seguridad",
  "Administración pública",
  "Sector privado (comercio/industria/servicios)",
  "Hostelería y turismo",
  "Transporte y logística",
  "Tecnología e informática",
  "Otro",
];

export const CHILDREN_OPTIONS = [
  "No",
  "Sí, 1",
  "Sí, 2",
  "Sí, 3 o más",
];

export const DEPENDENTS_OPTIONS = ["No", "Sí"];

export const CARE_FREQUENCY_OPTIONS = [
  "Ocasionalmente",
  "Varios días a la semana",
  "Diariamente",
];

export const REGIONS = [
  "Andalucía",
  "Aragón",
  "Asturias",
  "Islas Baleares",
  "Canarias",
  "Cantabria",
  "Castilla-La Mancha",
  "Castilla y León",
  "Cataluña",
  "Comunidad Valenciana",
  "Extremadura",
  "Galicia",
  "La Rioja",
  "Comunidad de Madrid",
  "Región de Murcia",
  "Comunidad Foral de Navarra",
  "País Vasco",
  "Ciudad Autónoma de Ceuta",
  "Ciudad Autónoma de Melilla",
  "Resido fuera de España",
];

export const MARITAL_OPTIONS = [
  "Soltero/a sin pareja",
  "Con pareja (sin convivencia)",
  "Casado/a o en pareja de hecho (convivencia)",
  "Separado/a o divorciado/a",
  "Viudo/a",
];

export const HOUSEHOLD_OPTIONS = [
  "1 (vivo solo/a)",
  "2",
  "3",
  "4",
  "5 o más",
];

