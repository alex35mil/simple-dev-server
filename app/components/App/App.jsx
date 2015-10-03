import React, { PropTypes } from 'react';

import Comments from '../Comments/Comments';

import './App.scss';


export default class App extends React.Component {

  static propTypes = {
    apiCall: PropTypes.func.isRequired,
  }


  constructor(props, context) {
    super(props, context);

    this.state = {
      comments : [],
      isLoading: true,
    };
  }


  componentDidMount() {
    ::this._loadComments();
  }


  _setIsLoadingState(isLoading) {
    this.setState({ isLoading });
  }


  _loadComments(cb) {
    const { apiCall } = this.props;

    apiCall({
      method: 'GET',
      url   : '/comments',
    })
      .then(res => {
        this.setState({
          comments : res.data.comments,
          isLoading: false,
        }, () => {
          if (cb && typeof cb === 'function') {
            return cb();
          }
        });
      });
  }


  render() {
    const { comments, isLoading } = this.state;

    return (
      <Comments
        comments={comments}
        isLoading={isLoading}
        reloadComments={::this._loadComments}
        setLoadingStateTo={::this._setIsLoadingState}
        {...this.props}
      />
    );
  }

}
