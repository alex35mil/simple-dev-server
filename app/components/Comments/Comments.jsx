import React, { PropTypes } from 'react';

import Comment        from './Item/Item';
import NewCommentForm from './New/New';
import Spinner        from '../Spinner/Spinner';

import css from './Comments.scss';


export default class Comments extends React.Component {

  static propTypes = {
    comments : PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }


  constructor(props, context) {
    super(props, context);
  }


  _renderNewCommentForm() {
    return (
      <NewCommentForm {...this.props} />
    );
  }


  _renderSpinner() {
    const { isLoading } = this.props;

    return (
      <div id="spinner-section-wrapper" className={css.spinnerSection}>
        {isLoading && <Spinner size={20} />}
      </div>
    );
  }


  _renderCommentsList() {
    const { comments } = this.props;

    return (
      <div id="comments-list">
      {
        comments
          .sort((prev, next) => next.id - prev.id)
          .map(comment => (
            <Comment key={comment.id} comment={comment} {...this.props} />
          ))
      }
      </div>
    );
  }


  render() {
    return (
      <section id="comments-wrapper" className={css.comments}>
        <h1>Comments</h1>
        {::this._renderNewCommentForm()}
        {::this._renderSpinner()}
        {::this._renderCommentsList()}
      </section>
    );
  }

}
