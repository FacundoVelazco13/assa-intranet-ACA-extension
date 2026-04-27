import { Component, OnInit, ViewEncapsulation, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PageLayoutComponent } from '@alfresco/aca-shared';
import { ItopPerson } from '../../../models/itop-types';
import { ItopService } from '../../../services/itop/itop.service';
import { Subject } from 'rxjs';
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isToday, getMonth, getDate, getYear } from 'date-fns';

interface BirthdayEntry {
  person: ItopPerson;
  day: number;
  month: number;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  birthdays: BirthdayEntry[];
}

@Component({
  selector: 'aca-birthday-calendar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, MatTooltipModule, PageLayoutComponent],
  templateUrl: './birthday-calendar.component.html',
  styleUrls: ['./birthday-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BirthdayCalendarComponent implements OnInit, OnDestroy {
  private readonly snackBar = inject(MatSnackBar);
  private readonly itopService = inject(ItopService);
  private readonly destroy$ = new Subject<void>();

  isLoading = true;
  viewDate = new Date();
  calendarDays: CalendarDay[] = [];
  birthdayMap: Map<string, BirthdayEntry[]> = new Map();
  weekDayNames: string[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
  monthNames: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  async ngOnInit() {
    this.isLoading = true;
    try {
      const allPeople = await this.itopService.getItopPeople();
      const peopleWithBirthdate = allPeople.filter((p) => p.birth_date);
      this.buildBirthdayMap(peopleWithBirthdate);
      this.generateCalendarDays();
      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching birthday data:', error);
      this.showError('Error al cargar los datos de cumpleaños.');
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  private buildBirthdayMap(people: ItopPerson[]): void {
    this.birthdayMap.clear();
    for (const person of people) {
      if (!person.birth_date) {
        continue;
      }
      const parts = person.birth_date.split('-');
      if (parts.length < 3) {
        continue;
      }
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      const key = `${month}-${day}`;
      const entry: BirthdayEntry = { person, day, month };
      const existing = this.birthdayMap.get(key);
      if (existing) {
        existing.push(entry);
      } else {
        this.birthdayMap.set(key, [entry]);
      }
    }
  }

  generateCalendarDays(): void {
    const start = startOfMonth(this.viewDate);
    const end = endOfMonth(this.viewDate);
    const daysInMonth = eachDayOfInterval({ start, end });

    let startDow = getDay(start);
    startDow = startDow === 0 ? 6 : startDow - 1;

    const prevMonthDays: CalendarDay[] = [];
    const prevMonth = subMonths(start, 1);
    const prevMonthEnd = endOfMonth(prevMonth);
    for (let i = startDow - 1; i >= 0; i--) {
      const date = new Date(prevMonthEnd);
      date.setDate(prevMonthEnd.getDate() - i);
      prevMonthDays.push(this.createCalendarDay(date, false));
    }

    const currentMonthDays: CalendarDay[] = daysInMonth.map((date) => this.createCalendarDay(date, true));

    const totalCells = 42;
    const remaining = totalCells - prevMonthDays.length - currentMonthDays.length;
    const nextMonthDays: CalendarDay[] = [];
    const nextMonth = addMonths(start, 1);
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(nextMonth);
      date.setDate(i);
      nextMonthDays.push(this.createCalendarDay(date, false));
    }

    this.calendarDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  }

  private createCalendarDay(date: Date, isCurrentMonth: boolean): CalendarDay {
    const month = getMonth(date) + 1;
    const day = getDate(date);
    const key = `${month}-${day}`;
    return {
      date,
      isCurrentMonth,
      isToday: isToday(date),
      birthdays: this.birthdayMap.get(key) || []
    };
  }

  navigateMonth(offset: number): void {
    const candidate = offset > 0 ? addMonths(this.viewDate, offset) : subMonths(this.viewDate, Math.abs(offset));
    if (getYear(candidate) !== getYear(new Date())) {
      return;
    }
    this.viewDate = candidate;
    this.generateCalendarDays();
  }

  get canNavigatePrev(): boolean {
    return getYear(subMonths(this.viewDate, 1)) === getYear(new Date());
  }

  get canNavigateNext(): boolean {
    return getYear(addMonths(this.viewDate, 1)) === getYear(new Date());
  }

  get currentMonthLabel(): string {
    return `${this.monthNames[this.viewDate.getMonth()]} ${this.viewDate.getFullYear()}`;
  }

  get totalBirthdaysThisMonth(): number {
    const month = getMonth(this.viewDate) + 1;
    let count = 0;
    this.birthdayMap.forEach((entries, key) => {
      const entryMonth = parseInt(key.split('-')[0], 10);
      if (entryMonth === month) {
        count += entries.length;
      }
    });
    return count;
  }

  getWeekRows(): CalendarDay[][] {
    const rows: CalendarDay[][] = [];
    for (let i = 0; i < this.calendarDays.length; i += 7) {
      rows.push(this.calendarDays.slice(i, i + 7));
    }
    return rows;
  }

  getShortName(friendlyname: string): string {
    const parts = friendlyname.trim().split(' ');
    return parts[0];
  }

  getInitials(friendlyname: string): string {
    return friendlyname
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
}
