import React, { PropTypes } from 'react';

import css from './Show.scss';


export default class ShowComment extends React.Component {

  static propTypes = {
    comment          : PropTypes.object.isRequired,
    apiCall          : PropTypes.func.isRequired,
    toggleMode       : PropTypes.func.isRequired,
    setLoadingStateTo: PropTypes.func.isRequired,
    reloadComments   : PropTypes.func.isRequired,
  }


  constructor(props, context) {
    super(props, context);
  }


  _handleDelete() {
    const { comment, apiCall, setLoadingStateTo, reloadComments } = this.props;

    setLoadingStateTo(true);

    apiCall({
      method: 'DELETE',
      url   : `/comments/${comment.id}`,
    })
      .then(reloadComments);
  }


  render() {
    const { comment, toggleMode } = this.props;

    return (
      <div className={css.commentWrapper}>
        <div className={css.author}>{comment.author}</div>
        <div className={css.comment}>{comment.comment}</div>
        <div className={css.buttons}>
          <span className={css.edit} onClick={toggleMode}>
            Edit
          </span>
          <span className={css.delete} onClick={::this._handleDelete}>
            Delete
          </span>
        </div>
      </div>
    );
  }

}
