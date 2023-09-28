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
  return {
    name,
    start: new Date(`01/20/${start}`).getTime(),
    end: new Date(`01/20/${end}`)?.getTime() || Date.now(),
  };
});

export const linkPresident = (dateString) => {
  const lawPassDate = new Date(dateString).getTime();
  for (let i = 0; i < PRESIDENTS.length; i++) {
    const president = PRESIDENTS[i];
    if (lawPassDate >= president.start && lawPassDate <= president.end) {
      return president.name;
    }
  }
};
