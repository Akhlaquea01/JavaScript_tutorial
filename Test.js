const nameFirst = [
  {
    id: 1,
    fname: 'bill'
  },
  {
    id: 2,
    fname: 'ted'
  }
];
const nameLast = [
  {
    id: 2,
    lname: 'Talks'
  },
  {
    id: 1,
    lname: 'Books'
  }
];

let x = nameFirst.map(el => {
  nameLast.filter(ele => {
    if(el.id === ele.id) {
      return el.fname + ' ' + ele.lname;
    }
  })
  // return nameFirst.concat(nameLast);
});
// console.log(x);