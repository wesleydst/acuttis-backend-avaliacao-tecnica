const timeCalculator = require("./TimeCalculator");
const allValuesForTestCases = [
  // Casos de testes apresentados na avaliação técnica:
  { start: "19:03", end: "06:59", daytimeInMinutes: 296, nocturnalInMinutes: 420 },
  { start: "23:59", end: "08:02", daytimeInMinutes: 182, nocturnalInMinutes: 301 },
  { start: "15:00", end: "23:00", daytimeInMinutes: 420, nocturnalInMinutes: 60 },

  // Casos de testes gerados para lidar com todos os casos possíveis, ou seja:
  // - 1 minuto antes de trocar de turno:  (04:59 e 21:59)
  // - hora exata de troca de turno:       (05:00 e 22:00)
  // - 1 minuto depois de trocar de turno: (05:01 e 22:01)
  // Combinando todos esses casos, mas removendo quando início = fim
  { start: "04:59", end: "05:00", daytimeInMinutes: 0, nocturnalInMinutes: 1 },
  { start: "04:59", end: "05:01", daytimeInMinutes: 1, nocturnalInMinutes: 1 },
  { start: "04:59", end: "21:59", daytimeInMinutes: 1019, nocturnalInMinutes: 1 },
  { start: "04:59", end: "22:00", daytimeInMinutes: 1020, nocturnalInMinutes: 1 },
  { start: "04:59", end: "22:01", daytimeInMinutes: 1020, nocturnalInMinutes: 2 },
  { start: "05:00", end: "04:59", daytimeInMinutes: 1020, nocturnalInMinutes: 419 },
  { start: "05:00", end: "05:01", daytimeInMinutes: 1, nocturnalInMinutes: 0 },
  { start: "05:00", end: "21:59", daytimeInMinutes: 1019, nocturnalInMinutes: 0 },
  { start: "05:00", end: "22:00", daytimeInMinutes: 1020, nocturnalInMinutes: 0 },
  { start: "05:00", end: "22:01", daytimeInMinutes: 1020, nocturnalInMinutes: 1 },
  { start: "05:01", end: "04:59", daytimeInMinutes: 1019, nocturnalInMinutes: 419 },
  { start: "05:01", end: "05:00", daytimeInMinutes: 1019, nocturnalInMinutes: 420 },
  { start: "05:01", end: "21:59", daytimeInMinutes: 1018, nocturnalInMinutes: 0 },
  { start: "05:01", end: "22:00", daytimeInMinutes: 1019, nocturnalInMinutes: 0 },
  { start: "05:01", end: "22:01", daytimeInMinutes: 1019, nocturnalInMinutes: 1 },
  { start: "21:59", end: "04:59", daytimeInMinutes: 1, nocturnalInMinutes: 419 },
  { start: "21:59", end: "05:00", daytimeInMinutes: 1, nocturnalInMinutes: 420 },
  { start: "21:59", end: "05:01", daytimeInMinutes: 2, nocturnalInMinutes: 420 },
  { start: "21:59", end: "22:00", daytimeInMinutes: 1, nocturnalInMinutes: 0 },
  { start: "21:59", end: "22:01", daytimeInMinutes: 1, nocturnalInMinutes: 1 },
  { start: "22:00", end: "04:59", daytimeInMinutes: 0, nocturnalInMinutes: 419 },
  { start: "22:00", end: "05:00", daytimeInMinutes: 0, nocturnalInMinutes: 420 },
  { start: "22:00", end: "05:01", daytimeInMinutes: 1, nocturnalInMinutes: 420 },
  { start: "22:00", end: "21:59", daytimeInMinutes: 1019, nocturnalInMinutes: 420 },
  { start: "22:00", end: "22:01", daytimeInMinutes: 0, nocturnalInMinutes: 1 },
  { start: "22:01", end: "04:59", daytimeInMinutes: 0, nocturnalInMinutes: 418 },
  { start: "22:01", end: "05:00", daytimeInMinutes: 0, nocturnalInMinutes: 419 },
  { start: "22:01", end: "05:01", daytimeInMinutes: 1, nocturnalInMinutes: 419 },
  { start: "22:01", end: "21:59", daytimeInMinutes: 1019, nocturnalInMinutes: 419 },
  { start: "22:01", end: "22:00", daytimeInMinutes: 1020, nocturnalInMinutes: 419 },
];

describe("Time Calculator", () => {
  test("Deve retornar erro ao informar tempos iguais", () => {
    const startTimeString = "01:00";
    const endTimeString = "01:00";
    const test = () => timeCalculator.calculate(startTimeString, endTimeString);

    expect(test).toThrow("Tempos iguais não é válido.");
  });

  allValuesForTestCases.forEach((value) => {
    test(`De ${value.start} às ${value.end} retorna ${value.daytimeInMinutes}min diurnos e ${value.nocturnalInMinutes}min noturnos`, () => {
      const result = timeCalculator.calculate(value.start, value.end);

      expect(result).toEqual({
        daytimeInMinutes: value.daytimeInMinutes,
        nocturnalInMinutes: value.nocturnalInMinutes
      });
    });
  });
});
