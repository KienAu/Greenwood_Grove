<template>
    <div class="calendar">
        <div class="calendar__container">
            <div class="calendar__top">
                <div class="calendar__prev" @click="previousMonth()">
                    <MacroArrowLeftWhite />
                </div>
                <div class="calendar__title"> <h5 class="calendar__title--month"></h5> <span></span> <h5 class="calendar__title--year"></h5></div>
                <div class="calendar__next" @click="nextMonth()">
                    <MacroArrowRightWhite />
                </div>
            </div>
            <div class="calendar__day-name--container">
                <div class="calendar__day-name" v-for="day in days" :key="day">
                    {{ day }}
                </div>
            </div>
            <div class="calendar__day--container">
                <div class="calendar__day" v-for="index in 42" :key="index" @click="highlightDay(index - 0)">
                    <span class="calendar__day-number"></span>
                    <ul class="calendar__day-event--list">
                    </ul>
                </div>
            </div>
        </div>
        <div class="calendar__legend">
            <h6> {{ $t('Legend:') }} </h6>
            <div class="calendar__legend--container">
                <ul class="calendar__legend--type-list">
                    <li class="calendar__legend--type-item"><span class="calendar__legend--color calendar__legend--color--courses"></span>Courses</li>
                    <li class="calendar__legend--type-item"><span class="calendar__legend--color calendar__legend--color--workshops"></span>Workshops</li>
                    <li class="calendar__legend--type-item"><span class="calendar__legend--color calendar__legend--color--events"></span>Events</li>
                    <li class="calendar__legend--type-item"><span class="calendar__legend--color calendar__legend--color--celebrations"></span>Celebrations</li>
                </ul>
            </div>
        </div>
        <div class="calendar__highlight">
            <div class="calendar__selected-date--wrapper">
                <span class="calendar__selected-date"></span>
            </div>
            <ul class="calendar__highlight--event-list">
                <li class="calendar__highlight--event-item" v-for="item in displayEvent" :class="'calendar__highlight--type-' + item.legends">
                    {{ item.title }}, {{ item.startHours }} - {{ item.endHours }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    const storyblokApi = useStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories', {
        version: 'draft',
        starts_with: 'events',
        is_startpage: false,
    })

    const stories = data.stories
    let eventList = []

    stories.forEach((story) => {
        eventList.push(story.content)
    })

    const { t } = useI18n()

    const days = ref([
        t('days.Sunday'),
        t('days.Monday'),
        t('days.Tuesday'),
        t('days.Wednesday'),
        t('days.Thursday'),
        t('days.Friday'),
        t('days.Saturday'),
    ])

    const months = ref([
        t('months.January'),
        t('months.February'),
        t('months.March'),
        t('months.April'),
        t('months.May'),
        t('months.June'),
        t('months.July'),
        t('months.August'),
        t('months.September'),
        t('months.October'),
        t('months.November'),
        t('months.December'),
    ])

    let displayEvent = ref([]);
    const today = new Date()
    let currentMonth = today.getMonth()
    let currentYear = today.getFullYear()
    const updateCalendar = (month, year) => {
        const theFirst = new Date()
        theFirst.setMonth(month)
        theFirst.setYear(year)
        theFirst.setDate(1)
        const daysElement = document.querySelectorAll('.calendar__day')
        const monthEl = document.querySelector('.calendar__title--month')
        const yearEl = document.querySelector('.calendar__title--year')
        const theFirstDayOfWeek = theFirst.getDay()
        const monthName = months.value[month]
        monthEl.innerText = `${monthName}`
        yearEl.innerText = `${year}`
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        let dayCounter = 1
        for (let i = 0; i < daysElement.length; i++) {
            const day = daysElement[i]
            const dayNumber = day.querySelector('.calendar__day-number')

            if (i >= theFirstDayOfWeek && dayCounter <= daysInMonth) {
                const thisDate = new Date(year, month, dayCounter)
                const calendarEventList = day.querySelector('.calendar__day-event--list')
                const calendarEventItems = calendarEventList.querySelectorAll('li')

                calendarEventItems.forEach((item) => {
                    item.remove()
                })

                eventList.forEach((event) => {
                    const li = document.createElement('li')
                    if (thisDate.getTime() === new Date(event.date).getTime()) {
                        li.classList.add('calendar__dot')
                        switch (event.legends) {
                            case 'events':
                                li.classList.add('calendar__dot--events')
                                break
                            case 'courses':
                                li.classList.add('calendar__dot--courses')
                                break
                            case 'workshops':
                                li.classList.add('calendar__dot--workshops')
                                break
                            case 'celebrations':
                                li.classList.add('calendar__dot--celebrations')
                                break
                        }
                        calendarEventList.appendChild(li);
                    }
                })

                dayNumber.innerText = dayCounter
                dayCounter++
                dayNumber.classList.remove('is-empty')
            } else {
                dayNumber.innerText = ''
                dayNumber.classList.add('is-empty')
            }
        }
    }

    const dateDisplaySelected = () => {
        const selectedDate = document.querySelector('.calendar__selected-date')
        let day = new Date().getDate()
        let monthNum = new Date().getMonth()
        let year = new Date().getFullYear()
        let month = months.value[monthNum]
        let formatDay;
        switch (day) {
            case '1':
                formatDay = 'st'
                break
            case '2':
                formatDay = 'nd'
                break
            default:
                formatDay = 'th'
        }

        let currentDate = `${month} ${day + formatDay}, ${year}`

        selectedDate.innerText = currentDate

        eventList.forEach((event) => {
            let eventDate = new Date(event.date)
            if (eventDate.getTime() === new Date(`${month}-${day}-${year}`).getTime()) {
                displayEvent.value.push(event)
            }
        })
    }

    

    const highlightDay = (e) => {
        displayEvent.value = [];
        const daysElement = document.querySelectorAll('.calendar__day')
        const selectedDate = document.querySelector('.calendar__selected-date')
        const selectedMonth = document.querySelector('.calendar__title--month').innerText
        const selectedYear = document.querySelector('.calendar__title--year').innerText
        daysElement.forEach((day) => {
            day.classList.remove('is-selected')
        })
        const index = e - 1
        const day = daysElement[index]
        let selectedDay = day.querySelector('.calendar__day-number').innerText
        const dayNumber = day.querySelector('.calendar__day-number')
        let formatDay;

        switch (selectedDay) {
            case '1':
                formatDay = 'st'
                break
            case '2':
                formatDay = 'nd'
                break
            default:
                formatDay = 'th'
        }

        if (dayNumber.innerText != '') {
            day.classList.add('is-selected')
            selectedDate.innerText = `${selectedMonth} ${selectedDay + formatDay}, ${selectedYear}`
            let date = new Date(`${selectedYear}-${selectedMonth}-${selectedDay}`)
            eventList.forEach((event) => {
                let eventDate = new Date(event.date)
                if (eventDate.getTime() === date.getTime()) {
                    displayEvent.value.push(event)
                }
            })
        }
    }

    const previousMonth = () => {
        const daysElement = document.querySelectorAll('.calendar__day')

        daysElement.forEach((day) => {
            day.classList.remove('is-selected')
        })
        if (currentMonth === 0) {
            currentMonth = 12
            currentYear--
        }

        updateCalendar(--currentMonth, currentYear)
    }

    const nextMonth = () => {
        const daysElement = document.querySelectorAll('.calendar__day')

        daysElement.forEach((day) => {
            day.classList.remove('is-selected')
        })
        
        if (currentMonth === 11) {
            currentMonth = -1
            currentYear++
        }

        updateCalendar(++currentMonth, currentYear)
    }

    onMounted(() => {
        const loadEvents = async () => {
            updateCalendar(currentMonth, currentYear)
        }

        dateDisplaySelected()
        setTimeout(() => {
            loadEvents()
        }, 0)
    })
</script>