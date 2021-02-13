interface Student {
  name: string;
  group: string;
}

const studentGroupParser = (data: string) => {
  const studentsGroups: Student[] = data.split('; ').map((dataInfo) => {
    const [name, group] = dataInfo.split(' - ');
    return {name, group};
  });
  const dictionary = new Map<string, string[]>();
  studentsGroups.forEach(({name, group}) => {
    const groupPrev = dictionary.get(group) ?? [];
    groupPrev.push(name);
    dictionary.set(group, groupPrev);
  });
  return dictionary;
};

const getRandomArrayPoints = (size: number, max: number) =>
  new Array(size).fill(0).map(() => Math.floor(Math.random() * max));

const gradePoints = (
  dictionary: Map<string, string[]>,
  max: number = 100,
  count: number = 6,
) => {
  const groupsStudentsScore = new Map<string, {[key: string]: number[]}>();
  dictionary.forEach((students, group) => {
    const groupContainer = Object.assign(
      {},
      ...students.map((student) => {
        const points = getRandomArrayPoints(count, max);
        return {[student]: points};
      }),
    );
    groupsStudentsScore.set(group, groupContainer);
  });
  return groupsStudentsScore;
};

const sumStudetsPoints = (
  dictionary: Map<string, {[key: string]: number[]}>,
) => {
  const groupsStudentsScore = new Map<string, {[key: string]: number}>();
  dictionary.forEach((students, group) => {
    const studentsSumMarkArray = Object.entries(
      students,
    ).map(([key, value]) => [
      key,
      (<number[]>value).reduce((acc: number, cur: number) => (acc += cur), 0),
    ]);
    const groupContainer = Object.fromEntries(studentsSumMarkArray);
    groupsStudentsScore.set(group, groupContainer);
  });
  return groupsStudentsScore;
};

const averageGroupStudentsMark = (
  dictionary: Map<string, {[key: string]: number}>,
) => {
  const groupsStudentsScore = new Map<string, number>();
  dictionary.forEach((students, group) => {
    const allMarks = Object.values(students).reduce(
      (acc, cur) => (acc += cur),
      0,
    );
    const averageGroupMark = allMarks / Object.values(students).length;
    groupsStudentsScore.set(group, averageGroupMark);
  });
  return groupsStudentsScore;
};

const filterStudentsGroupByPoint = (
  minPoint: number,
  dictionary: Map<string, {[key: string]: number}>,
) => {
  const groupsStudents = new Map<string, string[]>();
  dictionary.forEach((students, group) => {
    const studentsCorrectbyMark: string[] = [];
    Object.entries(students).forEach(([student, point]) => {
      if (point >= minPoint) {
        studentsCorrectbyMark.push(student);
      }
    });
    groupsStudents.set(group, studentsCorrectbyMark);
  });
  return groupsStudents;
};

let studentsStr =
  'Дмитренко Олександр - ІП-84; Матвійчук Андрій - ІВ-83; Лесик Сергій - ІО-82; Ткаченко Ярослав - ІВ-83; Аверкова Анастасія - ІО-83; Соловйов Даніїл - ІО-83; Рахуба Вероніка - ІО-81; Кочерук Давид - ІВ-83; Лихацька Юлія - ІВ-82; Головенець Руслан - ІВ-83; Ющенко Андрій - ІО-82; Мінченко Володимир - ІП-83; Мартинюк Назар - ІО-82; Базова Лідія - ІВ-81; Снігурець Олег - ІВ-81; Роман Олександр - ІО-82; Дудка Максим - ІО-81; Кулініч Віталій - ІВ-81; Жуков Михайло - ІП-83; Грабко Михайло - ІВ-81; Іванов Володимир - ІО-81; Востриков Нікіта - ІО-82; Бондаренко Максим - ІВ-83; Скрипченко Володимир - ІВ-82; Кобук Назар - ІО-81; Дровнін Павло - ІВ-83; Тарасенко Юлія - ІО-82; Дрозд Світлана - ІВ-81; Фещенко Кирил - ІО-82; Крамар Віктор - ІО-83; Іванов Дмитро - ІВ-82';

console.log('Завдання 1');
const studentsGroups = studentGroupParser(studentsStr);
console.log(studentsGroups);

console.log('Завдання 2');
const studentsMarks = gradePoints(studentsGroups, 20, 9);
console.log(studentsMarks);

console.log('Завдання 3');
const studentsMarksSum = sumStudetsPoints(studentsMarks);
console.log(studentsMarksSum);

console.log('Завдання 4');
const groupsAverageMark = averageGroupStudentsMark(studentsMarksSum);
console.log(groupsAverageMark);

console.log('Завдання 5');
const filterStudentsWithoutDopka = filterStudentsGroupByPoint(
  60,
  studentsMarksSum,
);
console.log(filterStudentsWithoutDopka);
