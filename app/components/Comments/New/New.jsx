import React, { PropTypes } from 'react';

import css from './New.scss';


export default class NewCommentForm extends React.Component {

  static propTypes = {
    apiCall          : PropTypes.func.isRequired,
    setLoadingStateTo: PropTypes.func.isRequired,
    reloadComments   : PropTypes.func.isRequired,
    isLoading        : PropTypes.bool.isRequired,
  }


  constructor(props, context) {
    super(props, context);

    this.state = {
      author : '',
      comment: '',
    };
  }


  _handleChange(e) {
    const attr  = e.target.name;
    const value = e.target.value;
    this.setState({ [attr]: value });
  }


  _handleSubmit(e) {
    e.preventDefault();

    const { author, comment } = this.state;
    const authorValue  = author && author.trim();
    const commentValue = comment && comment.trim();

    if (!authorValue || !commentValue) return;

    const { apiCall, setLoadingStateTo, reloadComments } = this.props;

    setLoadingStateTo(true);

    apiCall({
      method: 'POST',
      url   : '/comments',
      data  : {
        author : authorValue,
        comment: commentValue,
      },
    })
      .then(() => {
        reloadComments(() => {
          this.setState({ comment: '' });
        });
      });
  }


  render() {
    const { isLoading } = this.props;

    return (
      <form className={css.newComment} onSubmit={::this._handleSubmit}>
        <div className={css.sectionWrapper}>
          <input
            name="author"
            type="text"
            value={this.state.author}
            placeholder="Your name"
            onChange={::this._handleChange}
          />
        </div>
        <div className={css.sectionWrapper}>
          <textarea
            name="comment"
            value={this.state.comment}
            placeholder="Comment..."
            onChange={::this._handleChange}
          />
        </div>
        <div className={css.sectionWrapper}>
          <button disabled={isLoading}>Submit comment</button>
        </div>
      </form>
    );
  }

}
