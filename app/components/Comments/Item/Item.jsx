import React from 'react';

import ShowComment from './Show/Show';
import EditComment from './Edit/Edit';


export default class Comment extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = { isEditing: false };
  }


  _toggleMode() {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }


  render() {
    const { isEditing } = this.state;
    const Component = isEditing ? EditComment : ShowComment;

    return (
      <Component toggleMode={::this._toggleMode} {...this.props} />
    );
  }

}
