import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { AppStateType } from "../../../redux/ReduxStore";
import { Form, Input, Button, message } from "antd";
import {
  maxLengthCreator,
  requiredField,
  symbolValidField,
} from "../../utils/validators";
import { Row, Col } from "react-grid-system";
import {
  getImagesTC,
  imagesOut,
  toggleIsEditGruppTC,
} from "../../../redux/FormSearchReducer";

const FormItem = Form.Item;

//@ts-ignore
const makeField = (Component) => ({input,meta,children,hasFeedback,label,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

const AInput = makeField(Input);
type LoginFormOwnProps = {};
const maxLenght = maxLengthCreator(10);
const AddNestForm: React.FC<
  InjectedFormProps<NestFormValueType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ error, ...props }) => {
  const { handleSubmit, reset, submitting } = props;
  const dispatch = useDispatch();
  const isFetching = useSelector(
    (state: AppStateType) => state.formSearch.isFetching
  );
  const isEditGrupp = useSelector(
    (state: AppStateType) => state.formSearch.isEditGrupp
  );
  let clickTag = useSelector(
    (state: AppStateType) => state.formSearch.clickTag
  );
  const getimagesOut = () => {
    dispatch(imagesOut());
    reset();
  };
  const getEditModGrupp = () => {
    dispatch(toggleIsEditGruppTC(isEditGrupp ? false : true));
  };
  return (
    <form onSubmit={handleSubmit} style={{ paddingTop: "16px" }}>
      {error ? message.error(error) : ""}
      <Row>
        <Col md={3} offset={{ md: 3 }}>
          <Field
            label={clickTag}
            name="value"
            component={AInput}
            placeholder={"введите тег"}
            validate={[requiredField, maxLenght, symbolValidField]}
            hasFeedback
          />
        </Col>
        <Col md={6}>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={submitting || isFetching}
              style={{ marginRight: "10px" }}
            >
              {isFetching ? "Загрузка ..." : "Загрузить"}
            </Button>
            <Button onClick={getimagesOut} style={{ marginRight: "10px" }}>
              Очистить
            </Button>
            <Button onClick={getEditModGrupp}>
              {isEditGrupp ? "Разгруппировать" : "Группировать"}
            </Button>
          </FormItem>
        </Col>
      </Row>
    </form>
  );
};

const AddNestReduxForm = reduxForm<NestFormValueType, LoginFormOwnProps>({
  form: "form_search",
})(AddNestForm);
type NestFormValueType = {
  value: string;
  nestName: string;
  nestType: any;
  nestLocation: string;
  nestDate: string;
  nestTime: string;
  nestAmountMaximum: number;
  nestAgeRestrictions: number;
};

export const FormSearch: React.FC = () => {
  const dispatch = useDispatch();
  const showResults = (value: NestFormValueType) => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let delay = 5000;
    if (value.value === "delay") {
      let timerId = setTimeout(function request() {
        for (let i = 0; i < Math.floor(Math.random() * Math.floor(10)); i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log(text);
        dispatch(getImagesTC(text));
        timerId = setTimeout(request, delay);
      }, delay);
    } else {
      dispatch(getImagesTC(value.value));
    }
  };
  return <AddNestReduxForm onSubmit={showResults} />;
};
