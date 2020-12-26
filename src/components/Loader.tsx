import React from 'react'
import { Col, Row, Spin } from 'antd';

let Loader:React.FC = ()=>{
   return  (
      <Row justify="space-around" align="middle">
         <Col span={3}>
         <div  className="example">
    <Spin />
  </div>,
 </Col>
 </Row>
   )
}

export default Loader