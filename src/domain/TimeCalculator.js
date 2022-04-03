function convertTimeStringToMillis(timeString) {
  const [hour, minutes] = timeString
    .split(":")
    .map(value => parseInt(value));
  const totalMinutes = (hour * 60) + minutes;
  const ONE_MINUTE_AS_MILLIS = 60 * 1000;
  return totalMinutes * ONE_MINUTE_AS_MILLIS;
}

function getDiffInMinutes(startDateTime, endDateTime) {
  const diff = endDateTime - startDateTime;
  const diffInMinutes = Math.floor(diff / 60 / 1000);
  return diffInMinutes;
}

/**
 * Recebe um período de trabalho (hora inicial e hora final) e identifica a
 * quantidade de horas que foram trabalhadas em horário diurno e também as que
 * foram trabalhadas em horário noturno. Considera-se horário noturno todo o
 * período trabalhado entre as 22:00 e as 05:00. Por consequência, considera-se
 * horário diurno todo o período trabalhado entre as 05:00 e as 22:00.
 *
 * @param {string} startTimeString - hora inicial do período de trabalho.
 * @param {string} endTimeString - hora final do período de trabalho.
 * @returns Retorna um objeto JSON com as propriedades daytimeInMinutes
 * (Number) e nocturnalInMinutes (Number).
 */
function calculate(startTimeString, endTimeString) {
  if (startTimeString === endTimeString) {
    throw new Error("Tempos iguais não é válido.")
  }

  // A regra de negócio define que a mudança de turno acontece em dois momentos:
  //    às 22:00 e às 05:00
  // As variáveis abaixo irão ajudar a dividir os períodos para calcular as horas
  // trabalhadas em cada turno, pois pode acontecer de uma parte do período
  // começar antes do turno da noite, durar a noite toda e terminar no turno do
  // dia novamente.
  let periodDivider5h = new Date("2022-01-01 05:00");
  let periodDivider22h = new Date("2022-01-01 22:00");

  // Para facilitar o cálculo os perídos são transformados
  // em uma data completa no mesmo dia
  const defaultDateInMillis = new Date("2022-01-01 00:00").getTime();

  const startInMillis = convertTimeStringToMillis(startTimeString);
  const endInMillis = convertTimeStringToMillis(endTimeString);

  let startDateTime = new Date(defaultDateInMillis + startInMillis);
  let endDateTime = new Date(defaultDateInMillis + endInMillis);

  // Se o início for maior que o fim, significa que o perído termina no dia
  // seguinte, logo, adiciona um dia no fim e no divisor de período de 5h
  const startIsGreater = startInMillis > endInMillis;
  if (startIsGreater) {
    const ONE_DAY = 1;
    endDateTime.setDate(endDateTime.getDate() + ONE_DAY);
    periodDivider5h.setDate(periodDivider5h.getDate() + ONE_DAY);
  }

  // O início, o fim e os divisores de períodos são inseridos num array que
  // vai auxiliar separar o que foi trabalhado no turno da noite e o que foi no
  // turno do dia. Exemplo: se um período começa 20:00 e termina 06:00, neste
  // caso inicialmente foi trabalhado 2h no período diurno, depois 7h no noturno
  // e por fim mais 1h no diurno.
  let dateArray = [startDateTime, endDateTime, periodDivider5h, periodDivider22h];

  // Ordena as datas porque dependendo do período informado um divisor de
  // período inserido será inútil e será removido logo mais. Exemplo: de 21:00
  // até 03:00 o único divisor de perído contido nesse intervalo é o de 22:00.
  dateArray.sort((date1, date2) => date1.getTime() - date2.getTime());

  // Com o array ordenado conseguimos saber o índice do ínicio e fim do perído.
  const startIndex = dateArray.indexOf(startDateTime);
  const endIndex = dateArray.indexOf(endDateTime);

  // Agora pegamos do array apenas o intervalo útil. No exemplo de 21:00 até
  // 03:00 o divisor de 22h será removido.
  dateArray = dateArray.slice(startIndex, endIndex + 1);

  // Isso tudo foi a preparação para dividir o perído em subperíodos e definir
  // o que é noturno e o que é diurno. Vamos iterar com cada item e combiná-lo
  // com o próximo e definir se esse subperiodo é noturno ou diurno.
  const subperiodsArray = [];
  dateArray.forEach((startDate, i) => {
    const nextIndex = i + 1;
    const noNextDate = nextIndex === dateArray.length;
    if (noNextDate) { return; }

    // Para o ínicio do período 22:00 é noturno e 05:00 é diurno.
    const startHoursConsideredNocturnal = [22, 23, 0, 1, 2, 3, 4];

    // Devido à estrutura que criamos até aqui, se a hora de início está dentro
    // do período noturno, o fim também está.
    const isNocturnal = startHoursConsideredNocturnal.includes(startDate.getHours());

    subperiodsArray.push({
      start: startDate,
      end: dateArray[nextIndex],
      isNocturnal: isNocturnal
    });
  });

  // Itera sobre os subperíodos e soma tempo noturno e diurno separadamente e
  // depois retonar o resultado em minutos
  let daytimeInMinutes = 0;
  let nocturnalInMinutes = 0;
  subperiodsArray.forEach((subperiod) => {
    const diff = getDiffInMinutes(subperiod.start, subperiod.end);

    if (subperiod.isNocturnal) {
      nocturnalInMinutes = nocturnalInMinutes + diff;
      return;
    }

    daytimeInMinutes = daytimeInMinutes + diff;
  });

  return {
    daytimeInMinutes: daytimeInMinutes,
    nocturnalInMinutes: nocturnalInMinutes,
  }
}

module.exports = { calculate };