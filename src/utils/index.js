export const COLORS = [
    {
        color: "#696CFF",
        background: "#E7E7FF",
    },
    {
        color: "#03C3EC",
        background: "#E5F9FD",
    },
    {
        color: "#FF3E1D",
        background: "#FFEBE8",
    },
    {
        color: "#FFAB00",
        background: "#FFF2D6",
    },
    {
        color: "#82E14F",
        background: "#F0FCEA",
    },
]

// This function is to format date into YYYY-MM-DD HH:MM
export const formatDate = (date) => {
    if (!date) return "";

    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const minutes = String(newDate.getMinutes()).padStart(2, "0");
    const hours = String(newDate.getHours()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
}

export const formatDateOnly = (date) => {
  if (!date) return "";

  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const day = String(newDate.getDate()).padStart(2, "0");
  const month = String(newDate.getMonth() + 1).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

// This function is to capitalized the first letter of a word
export const capitalizeFirstLetter = (word) => {
    if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
        return '';
    }
}
// This function is to format number to have commas
// For Example: 123456789 would show as 123,456,789.89
export const addCommas = (number) => {
    if (number == null) return 0;
    if (isNaN(number)) return 0;
    const roundedNumber = Number(number).toFixed(2).replace(/\.00$/, '');
    // const parts = number.toString().split('.');
    const parts = roundedNumber.split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if(decimalPart != undefined) {
      const formattedNumber = `${integerPart}.${decimalPart}`;
      return formattedNumber;
    } else {
      return integerPart;
    }
}


// This function is to handle pagination page numbers
export const paginationPageNumbers = (pageCount, currentPage) => {
    const displayedPageNumbers = [];
    const totalPages = pageCount.value;
    const currentPageNumber = currentPage.value;

    // If page count is zero then return empty array
    if (totalPages === 0) {
        return [];
    }

    let startPage, endPage;
    if (totalPages <= 6) {
        startPage = 1;
        endPage = totalPages;
    } else if (currentPageNumber <= 3) {
        startPage = 1;
        endPage = 6;
    } else if (currentPageNumber + 2 >= totalPages) {
        startPage = Math.max(1, totalPages - 5);
        endPage = totalPages;
    } else {
        startPage = currentPageNumber - 2;
        endPage = currentPageNumber + 2;
    }

    if (startPage > 2) {
        displayedPageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        displayedPageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
        displayedPageNumbers.push('...');
    }

    // Always show the last page
    if (!displayedPageNumbers.includes(totalPages)) {
        displayedPageNumbers.push(totalPages);
    }

    // Add the first page if not already included
    if (!displayedPageNumbers.includes(1)) {
        displayedPageNumbers.unshift(1);
    }

    return displayedPageNumbers;
};

// SVG dynamic Image for table sorting filter 
export const SortingIcon = (fillColor1, fillColor2) => `
<svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.125 7.44462L7.39922 8.71884L11.2679 4.85021L15.1365 8.71884L16.4107 7.44462L11.2679 2.30176L6.125 7.44462Z" fill="${fillColor1}"/>
  <path d="M15.1365 15.2803L11.2679 19.1489L7.39922 15.2803L6.125 16.5545L11.2679 21.6974L16.4107 16.5545L15.1365 15.2803Z" fill="${fillColor2}"/>
</svg>`;

export const getColorForUsername = (index) => {
    const { color, background } = COLORS[index % 5];
    return { color, background }
}


// This function is to parse error messages from Zod
export const parseErrorMessage = (errorArray) => {
  return JSON.parse(errorArray)[0]
}

export const currencyList = [
  {
      name: "GBP",
      id: 'GBP',
  },
  {
      name: "EUR",
      id: 'EUR',
  },
  {
      name: "USD",
      id: 'USD',
  }
];

export const tenants = [
    {
        "id": 1,
        "key": "test1",
        "name": "Test 1",
        "website": "Test1.com",
        "iconUrl": null,
        "defaultLogo": {
            "color": "#696CFF",
            "background": "#E7E7FF"
        }
    },
    {
        "id": 2,
        "key": "test2",
        "name": "Test 2",
        "website": "Test2.com",
        "iconUrl": null,
        "defaultLogo": {
            "color": "#03C3EC",
            "background": "#E5F9FD"
        }
    }
]