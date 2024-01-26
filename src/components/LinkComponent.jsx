import { Link } from 'react-router-dom';

const LinkComponent = ({ disabled, to, children, ...rest }) => {
  if (disabled) {
    return <span {...rest}>{children}</span>;
  } else {
    return (
      <Link to={to} {...rest} style={{ textDecoration: 'none' }}>
        {children}
      </Link>
    );
  }
};

export default LinkComponent;
