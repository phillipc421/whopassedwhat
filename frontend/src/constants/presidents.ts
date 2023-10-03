export const PRESIDENTS = [
  {
    name: "HARRY S. TRUMAN",
    term: "1945-1953",
  },
  {
    name: "DWIGHT D. EISENHOWER",
    term: "1953-1961",
  },
  {
    name: "JOHN F. KENNEDY",
    term: "1961-1963",
  },
  {
    name: "LYNDON B. JOHNSON",
    term: "1963-1969",
  },
  {
    name: "RICHARD M. NIXON",
    term: "1969-1974",
  },
  {
    name: "GERALD R. FORD",
    term: "1974-1977",
  },
  {
    name: "JIMMY CARTER",
    term: "1977-1981",
  },
  {
    name: "RONALD REAGAN",
    term: "1981-1989",
  },
  {
    name: "GEORGE BUSH",
    term: "1989-1993",
  },
  {
    name: "WILLIAM J. CLINTON",
    term: "1993-2001",
  },
  {
    name: "GEORGE W. BUSH",
    term: "2001-2009",
  },
  {
    name: "BARACK OBAMA",
    term: "2009-2017",
  },
  {
    name: "DONALD J. TRUMP",
    term: "2017-2021",
  },
  {
    name: "JOSEPH R. BIDEN JR.",
    term: "2021-",
  },
].map((president) => {
  const { name, term } = president;
  const [start, end] = term.split("-");
  const slug = name
    .toLocaleLowerCase()
    .replaceAll(".", "")
    .replaceAll(" ", "-");
  return { name, slug, start, end };
});

const PRIOR_TO_CONGRESS_RECORDS = [
  {
    name: "GEORGE WASHINGTON",
    term: "1789-1797",
  },
  {
    name: "JOHN ADAMS",
    term: "1797-1801",
  },
  {
    name: "THOMAS JEFFERSON",
    term: "1801-1809",
  },
  {
    name: "JAMES MADISON",
    term: "1809-1817",
  },
  {
    name: "JAMES MONROE",
    term: "1817-1825",
  },
  {
    name: "JOHN QUINCY ADAMS",
    term: "1825-1829",
  },
  {
    name: "ANDREW JACKSON",
    term: "1829-1837",
  },
  {
    name: "MARTIN VAN BUREN",
    term: "1837-1841",
  },
  {
    name: "WILLIAM HENRY HARRISON",
    term: "1841",
  },
  {
    name: "JOHN TYLER",
    term: "1841-1845",
  },
  {
    name: "JAMES K. POLK",
    term: "1845-1849",
  },
  {
    name: "ZACHARY TAYLOR",
    term: "1849-1850",
  },
  {
    name: "MILLARD FILLMORE",
    term: "1850-1853",
  },
  {
    name: "FRANKLIN PIERCE",
    term: "1853-1857",
  },
  {
    name: "JAMES BUCHANAN",
    term: "1857-1861",
  },
  {
    name: "ABRAHAM LINCOLN",
    term: "1861-1865",
  },
  {
    name: "ANDREW JOHNSON",
    term: "1865-1869",
  },
  {
    name: "ULYSSES S. GRANT",
    term: "1869-1877",
  },
  {
    name: "RUTHERFORD B. HAYES",
    term: "1877-1881",
  },
  {
    name: "JAMES A. GARFIELD",
    term: "1881",
  },
  {
    name: "CHESTER A. ARTHUR",
    term: "1881-1885",
  },
  {
    name: "GROVER CLEVELAND (1st)",
    term: "1885-1889",
  },
  {
    name: "BENJAMIN HARRISON",
    term: "1889-1893",
  },
  {
    name: "GROVER CLEVELAND (2nd)",
    term: "1893-1897",
  },
  {
    name: "WILLIAM MCKINLEY",
    term: "1897-1901",
  },
  {
    name: "THEODORE ROOSEVELT",
    term: "1901-1909",
  },
  {
    name: "WILLIAM HOWARD TAFT",
    term: "1909-1913",
  },
  {
    name: "WOODROW WILSON",
    term: "1913-1921",
  },
  {
    name: "WARREN G. HARDING",
    term: "1921-1923",
  },
  {
    name: "CALVIN COOLIDGE",
    term: "1923-1929",
  },
  {
    name: "HERBERT HOOVER",
    term: "1929-1933",
  },
  {
    name: "FRANKLIN D. ROOSEVELT",
    term: "1933-1945",
  },
];
