const Calendar = (props) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    stroke="none"
    {...props}
  >
    <rect width="24" height="24" />
    <path
      d="M2.00162 10C2.00052 10.1027 2 10.2067 2 10.312V15.688C2 16.8044 2.05852 17.7698 2.23866 18.5804C2.42133 19.4024 2.74209 20.1251 3.30848 20.6915C3.87488 21.2579 4.59764 21.5787 5.41959 21.7613C6.23018 21.9415 7.19557 22 8.312 22H15.688C16.8044 22 17.7698 21.9415 18.5804 21.7613C19.4024 21.5787 20.1251 21.2579 20.6915 20.6915C21.2579 20.1251 21.5787 19.4024 21.7613 18.5804C21.9415 17.7698 22 16.8044 22 15.688V10.312C22 10.2067 21.9995 10.1027 21.9984 10H2.00162Z"
    />
    <path
      d="M4.99991 4.34708V3C4.99991 2.44772 5.44762 2 5.99991 2C6.55219 2 6.99991 2.44772 6.99991 3V4.03477C7.41104 4.01008 7.84846 4 8.31191 4H15.6879C16.1514 4 16.5888 4.01008 16.9999 4.03477V3C16.9999 2.44772 17.4476 2 17.9999 2C18.5522 2 18.9999 2.44772 18.9999 3V4.34708C19.649 4.54034 20.2235 4.8406 20.6914 5.30848C21.2578 5.87488 21.5786 6.59764 21.7612 7.41959C21.8024 7.60498 21.8373 7.79846 21.8665 8H2.1333C2.16253 7.79846 2.19737 7.60498 2.23857 7.41959C2.42124 6.59764 2.742 5.87488 3.30839 5.30848C3.77627 4.8406 4.35086 4.54034 4.99991 4.34708Z"
    />
  </svg>
);

export default Calendar;
