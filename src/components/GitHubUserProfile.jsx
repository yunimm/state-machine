import React from 'react'

function GitHubUserProfile(props) {
  console.log({ props })
  if (!props.user) {
    return <div>Loading...ＱＱＱ</div>;
  }

  const { name, login, bio, followers, avatar_url, created_at } = props.user
  return (
    <div className="ui card">
      <div className="image">
        <img src={avatar_url} alt={name} />
      </div>
      <div className="content">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://github.com/${login}`}
          className="header"
        >
          {name}
        </a>
        {created_at && (
          <div className="meta">
            <span className="date">Joined in {created_at.substring(0, 4)}</span>
          </div>
        )}
        <div className="description">{bio}</div>
      </div>
      <div className="extra content">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/gustavocd?tab=followers"
        >
          <i className="user icon" />
          {followers} Followers
        </a>
      </div>
    </div>
  )
}

export default GitHubUserProfile
