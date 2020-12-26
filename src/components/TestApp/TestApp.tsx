import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormSearch } from "./Form/Form";
import { AppStateType } from "../../redux/ReduxStore";
import { Container, Row, Col } from "react-grid-system";
import { toggleIsClickTagTC } from "../../redux/FormSearchReducer";

export const TestApp: React.FC = (props) => {
  const dispatch = useDispatch();
  const images = useSelector(
    (state: AppStateType) => state.formSearch.imagesArr
  );
  const tagsArrImage = useSelector(
    (state: AppStateType) => state.formSearch.tagsArrImage
  );
  const isEditGrupp = useSelector(
    (state: AppStateType) => state.formSearch.isEditGrupp
  );
  const getClickImage = (clickTag: string) => {
    dispatch(toggleIsClickTagTC(clickTag));
  };
  return (
    <Container fluid>
      <FormSearch />
      <Row>
        {!isEditGrupp &&
          images.map((u: any) => (
            <Row key={u.images} justify="around">
              <Col md={4}>
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                  }}
                >
                  {typeof u.images === "string" && (
                    <img
                      onClick={() => {
                        getClickImage(u.tag);
                      }}
                      src={u.images}
                      style={{
                        width: "300px",
                        height: "300px",
                        padding: "10px",
                      }}
                    />
                  )}
                  {Array.isArray(u.images) &&
                    u.images.map((x: string) => (
                      <img
                        key={x}
                        onClick={() => {
                          getClickImage(u.tag);
                        }}
                        style={{
                          width: "300px",
                          height: "150px",
                          padding: "10px",
                        }}
                        src={x}
                      />
                    ))}
                </div>
              </Col>
            </Row>
          ))}
      </Row>
      {isEditGrupp &&
        tagsArrImage.map((u: any) => (
          <Row key={u}>
            <h1
              style={{
                width: "200px",
              }}
            >
              {u}
            </h1>
            {images
              .filter((item) => item.tag === u)
              .map((i) => (
                <Row>
                  <Col md={4}>
                    <div
                      style={{
                        width: "300px",
                        height: "300px",
                      }}
                    >
                      {typeof i.images === "string" && (
                        <img
                          onClick={() => {
                            getClickImage(i.tag);
                          }}
                          src={i.images}
                          style={{
                            width: "300px",
                            height: "300px",
                            padding: "10px",
                          }}
                        />
                      )}
                      {Array.isArray(i.images) &&
                        i.images.map((x: string) => (
                          //<Col md={6}>
                          <img
                            key={x}
                            onClick={() => {
                              getClickImage(i.tag);
                            }}
                            src={x}
                            style={{
                              width: "300px",
                              height: "150px",
                              padding: "10px",
                            }}
                          />
                        ))}
                    </div>
                  </Col>
                </Row>
              ))}
          </Row>
        ))}
    </Container>
  );
};
