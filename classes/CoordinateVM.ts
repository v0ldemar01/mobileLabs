enum Direction {
  N = 'N',
  S = 'S',
  W = 'W',
  E = 'E',
}

interface ValidationValue {
  readonly min: number;
  readonly max: number;
}

const latitudeNorthValidate: ValidationValue = {
  min: 0,
  max: 90,
};

const latitudeSouthValidate: ValidationValue = {
  min: 0,
  max: 90,
};

const longitudeWestValidate: ValidationValue = {
  min: 0,
  max: 180,
};

const longitudeEastValidate: ValidationValue = {
  min: 0,
  max: 180,
};
const minuteValidate: ValidationValue = {
  min: 0,
  max: 59,
};
const secondValidate: ValidationValue = {
  min: 0,
  max: 59,
};

interface ValidateOptions {
  [index: string]: ValidationValue;
}

const directionValidateOptions: ValidateOptions = {
  [Direction.N]: latitudeNorthValidate,
  [Direction.S]: latitudeSouthValidate,
  [Direction.W]: longitudeWestValidate,
  [Direction.E]: longitudeEastValidate,
};

interface CheckValidation {
  (value: number, borderValue: ValidationValue): boolean;
}

const validate: CheckValidation = (
  value: number,
  {min, max}: ValidationValue,
) => (value >= min && value <= max ? true : false);

const averageCalc = (a: number, b: number) => (a + b) / 2;

class CoordinateVM {
  constructor(
    readonly degree: number,
    readonly minute: number,
    readonly second: number,
    readonly direction: Direction,
  ) {}

  static _checkCorrectData = (
    degree: number,
    minute: number,
    second: number,
    direction: Direction,
  ) => {
    if (!validate(degree, directionValidateOptions[direction])) {
      throw new Error('Degree is not valid according to the rules');
    }
    if (!validate(minute, minuteValidate)) {
      throw new Error('Minute is not valid according to the rules');
    }
    if (!validate(second, secondValidate)) {
      throw new Error('Second is not valid according to the rules');
    }
    return new CoordinateVM(degree, minute, second, direction);
  };

  static init(
    degree: number = 0,
    minute: number = 0,
    second: number = 0,
    direction: Direction = Direction.N,
  ) {
    try {
      return this._checkCorrectData(degree, minute, second, direction);
    } catch (err) {
      console.log(err.message);
    }
  }
  _toStringElements = (value: number) => (value < 10 ? `0${value}` : value);

  toString = () => {
    const {degree, minute, second, direction} = this;
    const formatDegree = this._toStringElements(degree);
    const formatMinute = this._toStringElements(minute);
    const formatSecond = this._toStringElements(second);
    return `${formatDegree}°${formatMinute}′${formatSecond}″ ${direction}`;
  };

  toOtherString = () => {
    const {degree, minute, second, direction} = this;
    const sec = second / 3600;
    const min = minute / 60;
    const hexCoordinate = degree + min + sec;
    return `${hexCoordinate}° ${direction}`;
  };

  averageCoordinates = (coordinate: CoordinateVM) => {
    if (this.direction !== coordinate.direction) {
      return null;
    }
    const degree = averageCalc(this.degree, coordinate.degree);
    const minute = averageCalc(this.minute, coordinate.minute);
    const second = averageCalc(this.second, coordinate.second);
    return new CoordinateVM(degree, minute, second, this.direction);
  };

  static averageGlobalCoordinates(
    coordinateFirst: CoordinateVM,
    coordinateSecond: CoordinateVM,
  ) {
    if (coordinateFirst.direction !== coordinateSecond.direction) {
      return null;
    }
    const degree = averageCalc(coordinateFirst.degree, coordinateSecond.degree);
    const minute = averageCalc(coordinateFirst.minute, coordinateSecond.minute);
    const second = averageCalc(coordinateFirst.second, coordinateSecond.second);
    return new CoordinateVM(degree, minute, second, coordinateFirst.direction);
  }
}

const coordinate1 = CoordinateVM.init();
const coordinate2 = CoordinateVM.init(50, 27, 0, Direction.N); //Kyiv

console.log(coordinate1, coordinate2);
console.log((<CoordinateVM>coordinate2).toString());
console.log((<CoordinateVM>coordinate2).toOtherString());
console.log(
  (<CoordinateVM>coordinate2).averageCoordinates(<CoordinateVM>coordinate1),
);
console.log(
  CoordinateVM.averageGlobalCoordinates(
    coordinate1 as CoordinateVM,
    coordinate2 as CoordinateVM,
  ),
);
