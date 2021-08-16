
import { Component, OnInit } from '@angular/core';

import { EntryService } from 'src/app/shared/services/entries/entry.service';
import { Entry } from 'src/app/shared/models/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

    entries: Entry[] = [];

    constructor(private entryService: EntryService) { }

    ngOnInit() {
        this.entryService.getAll().subscribe(
            entry => this.entries = entry.sort((a, b) => b.id - a.id),
            error => alert('Erro ao carregar lista')
        )
    }

    deleteEntry(entry) {
        const mustDelete = confirm('Deseja realmente excluir esse item?');

        if (mustDelete) {
            this.entryService.delete(entry.id).subscribe(
                () => this.entries = this.entries.filter(element => element != entry),
                () => alert('Erro ao tentar excluir')
            )
        }
    }

}
