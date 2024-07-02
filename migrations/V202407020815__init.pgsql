CREATE TABLE IF NOT EXISTS users(
  id uuid PRIMARY KEY,
  username varchar(50) NOT NULL UNIQUE,
  email varchar(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS articles(
  id uuid PRIMARY KEY,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  publication_date timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
  author_id uuid REFERENCES users(id) ON DELETE NO ACTION,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);

CREATE INDEX IF NOT EXISTS idx_articles_publication_date ON articles(publication_date);

