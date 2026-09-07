export type Bag = {
  id: string;
  name: string;
  price: string;
  status: "available" | "order";
  description: string;
  features: string[];
  image: string;
  available: boolean;
};

export const bags: Bag[] = [
  {
    id: "light",
    name: "Светлая мини",
    price: "3 900 ₽",
    status: "available",
    description:
      "Круглая мини-сумка из светлой рафии с мягким корпусом и длинным ремешком. Держит форму благодаря плотной вязке, при этом остается легкой и воздушной. Идеальна для городских прогулок и летних образов.",
    features: ["Натуральный оттенок", "Длинный ремешок", "Мягкий корпус", "Плотная вязка"],
    image: "/bag-light.jpg",
    available: true,
  },
  {
    id: "brown",
    name: "Коричневая классика",
    price: "4 200 ₽",
    status: "order",
    description:
      "Сумка из тонированной рафии насыщенного коричневого цвета. Ажурное плетение из более грубых волокон дает выразительную фактуру, ремешок выполнен в тон корпуса. Модель для пляжа, города и путешествий.",
    features: ["Коричневый тон", "Ажурное плетение", "Ремешок в тон", "Грубая фактура"],
    image: "/bag-brown.jpg",
    available: false,
  },
];
