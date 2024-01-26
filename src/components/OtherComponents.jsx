export const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export const ExternalLinkComponent = ({ disabled, to, children, ...rest }) => {
  if (disabled) {
    return <span {...rest}>{children}</span>;
  } else {
    return (
      <a
        href={to}
        {...rest}
        style={{ textDecoration: 'none' }}
        rel="noreferrer noopener"
      >
        {children}
      </a>
    );
  }
};

export const H5Typography = ({ children, color = '#fff' }) => (
  <Typography variant="h5" style={{ color: color }}>
    {children}
  </Typography>
);
