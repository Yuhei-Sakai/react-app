import { createStore } from 'redux';

const initData = {
  data:[{message:'sample data', created:new Date()}],
  message:'please type message:',
  mode:'default',
  fdata:[]
};

// レデューサー
export function memoReducer(state = initData, action) {
  switch (action.type) {
    case 'ADD':
      return addRimport React, { Component } from 'react';
      import { connect } from 'react-redux';
      import { addMemo } from './Store';
      
      
      class AddForm extends Component {
        input = {
          fontSize:"16pt",
          color:"#006",
          padding:"1px",
          margin:"5px 0px"
        }
        btn = {
          fontSize:"14pt",
          color:"#006",
          padding:"2px 10px"
        }
      
        constructor(props){
          super(props);
          this.state = {
            message:''
          }
          this.doChange = this.doChange.bind(this);
          this.doAction = this.doAction.bind(this);
        }
      
      
        doChange(e){
          this.setState({
            message: e.target.value
          });
        }
      
      
        doAction(e){
          e.preventDefault();
          let action = addMemo(this.state.message);
          this.props.dispatch(action);
          this.setState({
            message: ''
          });
        }
      
      
        render(){
          return (
            <div>
              <p style={this.message}>{this.props.message}</p>
              <form onSubmit={this.doAction}>
              <input type="text" size="40" onChange={this.doChange}
                style={this.input} value={this.state.message} required />
              <input type="submit" style={this.btn} value="Add"/>
              </form>
            </div>
          );
        }
      }
      export default connect((state)=>state)(AddForm);
      
      
      
      educe(state, action);

    case 'DELETE':
      return deleteReduce(state, action);

    case 'FIND':
      return findReduce(state, action);

    default:
      return state;
  }
}

// レデュースアクション

// メモ追加のレデュース処理
function addReduce(state, action){
  let data = {
    message:action.message,
    created:new Date()
  };
  let newdata = state.data.slice();
  newdata.unshift(data);
  return {
    data:newdata,
    message:'Added!',
    mode:'default',
    fdata:[]
  };
}

// メモ検索のレデュース処理
function findReduce(state, action){
  let f = action.find;
  let fdata = [];
  state.data.forEach((value)=>{
    if (value.message.indexOf(f) >= 0){
      fdata.push(value);
    }
  });
  return {
    data:state.data,
    message:'find "' + f + '":',
    mode:'find',
    fdata:fdata
  };
}

// メモ削除のレデュース処理
function deleteReduce(state, action){
  let newdata = state.data.slice();
  newdata.splice(action.index, 1);
  return {
    data:newdata,
    message:'delete "' + action.index + '":',
    mode:'delete',
    fdata:[]
  }
}

// アクションクリエーター

// メモ追加のアクション
export function addMemo(text) {
  return {
    type: 'ADD',
    message:text
  }
}

// メモ削除のアクション
export function deleteMemo(num) {
  return {
    type: 'DELETE',
    index:num
  }
}

// メモ検索のアクション
export function findMemo(text) {
  return {
    type: 'FIND',
    find:text
  }
}

// ストアを作成
export default createStore(memoReducer);
