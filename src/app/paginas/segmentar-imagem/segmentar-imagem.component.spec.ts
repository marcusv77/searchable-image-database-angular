import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SegmentarImagemComponent } from "./segmentar-imagem.component";

describe("ImagemComponent", () => {
    let component: SegmentarImagemComponent;
    let fixture: ComponentFixture<SegmentarImagemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SegmentarImagemComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SegmentarImagemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
