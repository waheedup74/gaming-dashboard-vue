<template>
  <div class="date-picker">
    <div class="input-container">
      <input v-model="selectedDate" type="text" placeholder="YYYY-MM-DD"/>
      <div class="icon" @click="togglePicker">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M9.33325 14.667H11.9999V17.3337H9.33325V14.667ZM9.33325 20.0003H11.9999V22.667H9.33325V20.0003ZM14.6666 14.667H17.3333V17.3337H14.6666V14.667ZM14.6666 20.0003H17.3333V22.667H14.6666V20.0003ZM19.9999 14.667H22.6666V17.3337H19.9999V14.667ZM19.9999 20.0003H22.6666V22.667H19.9999V20.0003Z" fill="#B4BDC6"/>
            <path d="M6.66667 29.3337H25.3333C26.804 29.3337 28 28.1377 28 26.667V8.00033C28 6.52966 26.804 5.33366 25.3333 5.33366H22.6667V2.66699H20V5.33366H12V2.66699H9.33333V5.33366H6.66667C5.196 5.33366 4 6.52966 4 8.00033V26.667C4 28.1377 5.196 29.3337 6.66667 29.3337ZM25.3333 10.667L25.3347 26.667H6.66667V10.667H25.3333Z" fill="#B4BDC6"/>
        </svg>
          <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> 
              <path :fill="showPicker ? '#8E9BAA' : '#B4BDC6'" d="M7 11H9V13H7V11ZM7 15H9V17H7V15ZM11 11H13V13H11V11ZM11 15H13V17H11V15ZM15 11H17V13H15V11ZM15 15H17V17H15V15Z" />
              <path :fill="showPicker ? '#8E9BAA' : '#B4BDC6'" d="M5 22H19C20.103 22 21 21.103 21 20V6C21 4.897 20.103 4 19 4H17V2H15V4H9V2H7V4H5C3.897 4 3 4.897 3 6V20C3 21.103 3.897 22 5 22ZM19 8L19.001 20H5V8H19Z" />
          </svg> -->
      </div>
    </div>
    <div v-if="showPicker || isPickerClicked" @mousedown="isPickerClicked = true" @mouseup="isPickerClicked = false" class="date-picker-container">
      <div class="calendar">
        <div class="header">
          <img @click.prevent="previousMonth" src="/images/svg/calendar-nav-prev.svg" alt="">
          <span @click="toggleShowMonths" style="cursor: pointer;">{{ currentMonth }} {{ currentYear }}</span>
          <img @click.prevent="nextMonth" src="/images/svg/calendar-nav-next.svg" alt="">
        </div>
        <div v-if="showMonths" class="months">
          <div v-for="(month, index) in months" :key="index" :class="{'selected-month': selectedMonth === month}" @click="() => {selectMonth(index); selectedMonth=month}" class="month" >{{ month }}</div>
        </div>
        <div v-if="!showMonths">
          <div class="days">
            <div v-for="day in days" :key="day" class="day">{{ day }}</div>
          </div>
          <div class="dates">
            <div v-for="(date, index) in dates" :key="index" :class="{ 'active-date': isActiveDateInSelectedMonth(date, currentDate, activeDate), 'current-date': isCurrentDateInCurrentMonth(date, currentDate), 'disabled-date': !isDateClickable(index)}" @click.prevent="isDateClickable(index) && selectDate(date)" class="date" >
              {{ date }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineExpose, onMounted, onBeforeUnmount} from 'vue';

const { getDate, startDate=false, endDate=false} = defineProps({
  getDate: {
    type: Function,
    required: true
  },
  startDate: {
    type: Boolean,
    required: false
  },
  endDate: {
    type: Boolean,
    required: false
  }
})

const showPicker = ref(false);
const isPickerClicked = ref(false);
const selectedDate = ref("");
const activeDate = ref("");
const currentDate = ref(new Date());
const showMonths = ref(false);
const months = [
  'Jan', 'Feb', 'Mar', 'Apr',
  'May', 'Jun', 'Jul', 'Aug',
  'Sep', 'Oct', 'Nov', 'Dec'
];
const currnetDate =  new Date();
const selectedMonth = ref(months[currnetDate.getMonth()]);
const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const calculateDates = () => {
  const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1).getDay();
  const lastDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0).getDate();
  const previousMonthLastDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 0).getDate();
  const totalDays = firstDayOfMonth + lastDayOfMonth;
  const extraDays = totalDays % 7 === 0 ? 0 : 7 - totalDays % 7;

  const datesArray = [];

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      datesArray.push(previousMonthLastDay - i);
  }

  for (let i = 1; i <= lastDayOfMonth; i++) {
      datesArray.push(i);
  }

  for (let i = 1; i <= extraDays; i++) {
      datesArray.push(i);
  }

  return datesArray;
};

const isDateClickable = (index) => {
  const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1).getDay();
  const lastDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0).getDate();
  return index >= firstDayOfMonth && index < firstDayOfMonth + lastDayOfMonth;
};

const dates = computed(() => calculateDates());

watch(currentDate, () => {
  dates.value = calculateDates();
});

watch(currentDate, () => {
  currentMonth.value = currentDate.value.toLocaleString('default', { month: 'long' });
  currentYear.value = currentDate.value.getFullYear();
});

const currentMonth = ref(currentDate.value.toLocaleString('default', { month: 'long' }));
const currentYear = ref(currentDate.value.getFullYear());

const previousMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() - 1);
  selectedMonth.value = months[newDate.getMonth()];
  currentDate.value = newDate;
};

const nextMonth = () => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + 1);
  selectedMonth.value = months[(newDate.getMonth() - 1) + 1];
  currentDate.value = newDate;
};

const formatDateObject = (dateObject) => {
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const fullDate = dateObject.toString();

  getDate({ formattedDate, fullDate })
  return { formattedDate, fullDate };
};

const selectDate = (date) => {
  if (date === "") {
    return;
  }
  const month = currentDate.value.getMonth() + 1;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDate = date < 10 ? '0' + date : date;
  activeDate.value = date;
  const selectedDateObject = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), date);
  formatDateObject(selectedDateObject);
  selectedDate.value = `${currentDate.value.getFullYear()}-${formattedMonth}-${formattedDate}`;
  showPicker.value = false;
};

const selectMonth = (index) => {
  const selectedDate = new Date(currentDate.value);
  selectedDate.setMonth(index);
  selectedDate.setDate(1);
  currentDate.value = selectedDate;

  const month = index + 1;
  const formattedMonth = month < 10 ? '0' + month : month;
  const currentYearValue = currentDate.value.getFullYear();

  selectedDate.value = `${currentYearValue}-${formattedMonth}-01`;
  currentMonth.value = currentDate.value.toLocaleString('default', { month: 'long' });
  currentYear.value = currentYearValue;
  showMonths.value = false;

  dates.value = calculateDates();
};

const isCurrentDateInCurrentMonth = (date, selectedDate) => {
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const today = new Date();
  const currentDate = today.getDate();
  return selectedYear === today.getFullYear() && selectedMonth === today.getMonth() && parseInt(date) === currentDate;
};

const isActiveDateInSelectedMonth = (date, selectedDate) => {
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  return selectedYear === currentDate.value.getFullYear() && selectedMonth === currentDate.value.getMonth() && parseInt(date) === activeDate.value;
};

onMounted(() => {
  const today = new Date();
  if (startDate) {
    selectDate(today)
  }

  if (endDate) {
    const endDatePlus30 = new Date(today);
    endDatePlus30.setDate(endDatePlus30.getDate() + 30);
    currentDate.value = endDatePlus30;
    selectDate(endDatePlus30);
  }
})

watch(selectedDate, (newValue) => {
  const regex = /^\d{0,4}-\d{0,2}-\d{0,2}$/;
  const formatted_date = newValue
    .replace(/\D/g, "")
    .replace(/^(\d{0,4})(\d{0,2})?(\d{0,2})?.*/, (match, p1, p2, p3) => {
      let result = '';
      if (p1) result += p1;
      if (p2) {
        const month = parseInt(p2);
        result += '-' + (month <= 12 ? p2 : '12');
      }
      if (p3 && p2) {
        const year = parseInt(p1);
        const month = parseInt(p2);
        const day = parseInt(p3);
        const maxDays = new Date(year, month > 0 ? month : 1, 0).getDate();
        result += '-' + (day <= maxDays ? p3 : maxDays);
      }
      return result;
    })
    .substring(0, 10);

    if (newValue !== formatted_date || (newValue && !regex.test(newValue))) {
    selectedDate.value = formatted_date;
    return  getDate({ formatted_date: "", fullDate: "" })
    } 
    else {
      if (newValue !== "") {
        const fullDate = new Date(formatted_date);
        selectedMonth.value = months[fullDate.getMonth()];
        const monthName = fullDate.toLocaleString('default', { month: 'long' });
        currentMonth.value = monthName;
        currentYear.value = fullDate.getFullYear();
        const day = fullDate.getDate();
        activeDate.value = day;
        currentDate.value = fullDate;
        
        dates.value = calculateDates();
        return  newValue !== "" && getDate({ formattedDate: formatted_date, fullDate: fullDate ?? "" })
      }

      return getDate({ formatted_date: '', fullDate: '' });
    }
});

const toggleShowMonths = () => {
  showMonths.value = !showMonths.value;
};

const togglePicker = () => {
  showPicker.value = !showPicker.value;
};

const closePicker = (event) => {
  if (!event.target.closest('.date-picker') && !isPickerClicked.value) {
    showPicker.value = false;
    showMonths.value = false;

    if (selectedDate.value === "")
    {
      const newDate = new Date();
      const monthName = newDate.toLocaleString('default', { month: 'long' });
      currentMonth.value = monthName;
      currentYear.value = newDate.getFullYear();
      currentDate.value = newDate;
      selectedMonth.value = months[newDate.getMonth()];
      const day = newDate.getDate();
      activeDate.value = day;

      dates.value = calculateDates();
    }
  }
};

onMounted(() => {
  document.addEventListener('mousedown', closePicker);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', closePicker);
});

const reset = () => {
  selectedDate.value = "";
};

const setDate = (date) => {
  selectedDate.value = date;
};


defineExpose({ reset, setDate });
</script>

