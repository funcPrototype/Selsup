import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Т.К. В ТЗ БЫЛ КЛАССОВЫЙ КОМПОНЕНТ Я ИСПОЛЬЗОВАЛ ТОЛЬКО ИХ
// ПРО СТИЛИ В ТЗ НИЧЕГО НЕ БЫЛО СКАЗАНО ПОЭТОМУ РЕШИЛ ИХ НЕ ИНЛАЙНИТЬ А ВЫНЕСТИ ВО ВНЕШНЮЮ ТАБЛИЦУ СТИЛЕЙ
// НАЧАЛЬНЫЕ ЗНАЧЕНИЯ
const initialModelData: Model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
};

const initialParamData: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
];

// ТИПЫ
interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  param: Param[];
  model: Model;
}

type MyState = { value: string };

// ГЛАВНЫЙ КОМПОНЕНТ
class ParamEditor extends React.Component<Props> {
  public getModel() {
    return this.props.model;
  }
  render(): React.ReactNode {
    return (
      <div className="container">
        <div>
          {this.props.param.map((elem, index) => {
            return (
              <div className="mystyle" key={elem.id}>
                <p>{elem.name}</p>
                <EditPlace
                  value={this.props.model.paramValues[index].value}
                  setValue={(value: string) =>
                    (this.props.model.paramValues[index].value = value)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
// КОМПОНЕНТ С РЕАЛИЗОВАННЫМ ТЗ
class EditPlace extends React.Component<
  { value: string; setValue: (a: string) => void },
  MyState
> {
  getDataTimeout: undefined | ReturnType<typeof setTimeout> = undefined;
  constructor(props: {
    value: string;
    getDataTimeout: any;
    setValue: (a: string) => void;
  }) {
    super(props);
    this.state = {
      value: this.props.value,
    };
    this.getDataTimeout = undefined;
  }

  // ОБРАБОТЧИК ИНПУТА С ИСПОЛЬЗОВАНИЕМ DEBOUNCE
  ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ value: value });
    if (this.getDataTimeout) {
      clearTimeout(this.getDataTimeout);
    }
    this.getDataTimeout = setTimeout(() => this.props.setValue(value), 1000);
  };

  render(): React.ReactNode {
    return <input value={this.state.value} onChange={this.ChangeHandler} />;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ParamEditor model={initialModelData} param={initialParamData} />
  </React.StrictMode>
);
