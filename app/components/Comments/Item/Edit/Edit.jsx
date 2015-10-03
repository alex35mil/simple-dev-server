import React, { PropTypes } from 'react';

import css from './Edit.scss';


export default class EditComment extends React.Component {

  static propTypes = {
    comment          : PropTypes.object.isRequired,
    apiCall          : PropTypes.func.isRequired,
    toggleMode       : PropTypes.func.isRequired,
    setLoadingStateTo: PropTypes.func.isRequired,
    reloadComments   : PropTypes.func.isRequired,
    isLoading        : PropTypes.bool.isRequired,
  }


  constructor(props, context) {
    super(props, context);

    this.state = {
      comment: props.comment.comment,
    };
  }


  _handleChange(e) {
    const attr  = e.target.name;
    const value = e.target.value;
    this.setState({ [attr]: value });
  }


  _handleSubmit(e) {
    e.preventDefault();

    const stateComment = this.state.comment;
    const commentValue = stateComment && stateComment.trim();

    if (!commentValue) return;

    const {
      comment,
      apiCall,
      toggleMode,
      setLoadingStateTo,
      reloadComments,
    } = this.props;

    setLoadingStateTo(true);

    apiCall({
      method: 'PATCH',
      url   : `/comments/${comment.id}`,
      data  : { comment: commentValue },
    })
      .then(() => {
        reloadComments(toggleMode);
      });
  }


  render() {
    const { toggleMode, isLoading, comment: { author } } = this.props;

    return (
      <form className={css.editComment} onSubmit={::this._handleSubmit}>
        <div className={css.author}>
          {author}
        </div>
        <div className={css.editable}>
          <textarea
            name="comment"
            value={this.state.comment}
            placeholder="Comment..."
            onChange={::this._handleChange}
          />
        </div>
        <div className={css.controls}>
          <button disabled={isLoading}>Edit comment</button>
          <span onClick={toggleMode}>Cancel</span>
        </div>
      </form>
    );
  }

}
