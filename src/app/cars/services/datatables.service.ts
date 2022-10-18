import {Injectable} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Injectable()
export class DatatablesService {

    constructor() {
    }

    procesarRespuesta<T>(datos: Array<T>, nuevosDatos: Array<T>, dtElement: DataTableDirective, dtTrigger: Subject<any>): Array<T> {

        if(datos && datos.length > 0) {
            datos.splice(0, datos.length);
        }
        datos = datos.concat(nuevosDatos);
        if(dtElement && dtElement.dtInstance) {

            dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                dtTrigger.next(null);
            });
        } else {

            dtTrigger.next(null);
        }
        return datos;
    }

    limpiarRegistros<T>(datos: Array<T>, dtElement: DataTableDirective, dtTrigger: Subject<any>): Array<T>{
        if(datos && datos.length > 0) {
            datos.splice(0, datos.length);
            dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.clear();
                dtInstance.destroy();
                dtTrigger.next(null);
            });
        }
        return datos;
    }

    settings(initialOrder?: Array<any>, disableOrderColumn?: Array<number>, filtro?: boolean, pageSize?: number): DataTables.Settings{
        const dt = this.defaultSettings();
        if(disableOrderColumn) {
            dt.columnDefs = [{
                targets: disableOrderColumn,
                orderable: false
            }];
        }
        if(initialOrder) {
            dt.order = initialOrder;
        }
        if(filtro) {
            dt.dom = '<"dt-botones d-sm-flex justify-content-md-between flex-md-row flex-sm-column"fBlr><"table-responsive table-heead-round"t>ip';
        }
        if(pageSize) {
            dt.pageLength = pageSize;
        }
        return dt;
    }

    defaultSettings(): DataTables.Settings {
        return {
            autoWidth: true,
            // deferRender: boolean,
            // info: boolean,
            // jQueryUI?: boolean,
            // lengthChange?: boolean;
            ordering: true,
            paging: true,
            processing: false,
            // scrollX?: boolean;
            // scrollY?: string;
            searching: true,
            // serverSide?: boolean;
            // stateSave?: boolean;

            //#endregion "Features"
            //#region "Data"
            // ajax?: string | AjaxSettings | FunctionAjax;
            // data?: any[];
            // columns?: ColumnSettings[];
            // columnDefs?: ColumnDefsSettings[];
            // deferLoading?: number | number[];
            destroy: true,
            // displayStart?: number;
            // dom: '<"dt-botones d-sm-flex justify-content-md-between flex-md-row flex-sm-column"flr><"table-responsive table-heead-round"t>ip',
            dom: '<"dt-botones d-sm-flex justify-content-md-between flex-md-row flex-sm-column"lr><"table-responsive table-heead-round"t>ip',
            // lengthMenu?: Array<(number | string)> | Array<Array<(number | string)>>;
            // orderCellsTop?: boolean;
            // orderClasses?: boolean;
            // order?: Array<(number | string)> | Array<Array<(number | string)>>;
            // orderFixed?: Array<(number | string)> | Array<Array<(number | string)>> | object;
            // orderMulti?: boolean;
            // pageLength?: number;
            /**
             * Pagination button display options. Basic Types: numbers (1.10.8) simple, simple_numbers, full, full_numbers
             */
            // pagingType?: string;
            // retrieve?: boolean;
            // renderer?: string | RendererSettings;
            // rowId?: string;
            // scrollCollapse?: boolean;
            // search?: SearchSettings | boolean;
            // searchPlaceholder?: SearchSettings;
            // searchCols?: SearchSettings[];
            // searchDelay?: number;
            // stateDuration?: number;
            // stripeClasses?: string[];
            // tabIndex?: number;
            // responsive?: boolean | object;

            //#endregion "Options"

            //#region "Callbacks"

            /**
             * Callback for whenever a TR element is created for the table's body. Since: 1.10
             */
            // createdRow?: FunctionCreateRow;

            /**
             * Function that is called every time DataTables performs a draw. Since: 1.10
             */
            // drawCallback?: FunctionDrawCallback;

            /**
             * Footer display callback function. Since: 1.10
             */
            // footerCallback?: FunctionFooterCallback;

            /**
             * Number formatting callback function. Since: 1.10
             */
            // formatNumber?: FunctionFormatNumber;

            /**
             * Header display callback function. Since: 1.10
             */
            // headerCallback?: FunctionHeaderCallback;

            /**
             * Table summary information display callback. Since: 1.10
             */
            // infoCallback?: FunctionInfoCallback;

            /**
             * Initialisation complete callback. Since: 1.10
             */
            // initComplete?: FunctionInitComplete;

            /**
             * Pre-draw callback. Since: 1.10
             */
            // preDrawCallback?: FunctionPreDrawCallback;

            /**
             * Row draw callback.. Since: 1.10
             */
            // rowCallback?: FunctionRowCallback;

            /**
             * Callback that defines where and how a saved state should be loaded. Since: 1.10
             */
            // stateLoadCallback?: FunctionStateLoadCallback;

            /**
             * State loaded callback. Since: 1.10
             */
            // stateLoaded?: FunctionStateLoaded;

            /**
             * State loaded - data manipulation callback. Since: 1.10
             */
            // stateLoadParams?: FunctionStateLoadParams;

            /**
             * Callback that defines how the table state is stored and where. Since: 1.10
             */
            // stateSaveCallback?: FunctionStateSaveCallback;

            /**
             * State save - data manipulation callback. Since: 1.10
             */
            // stateSaveParams?: FunctionStateSaveParams;

            //#endregion "Callbacks"

            //#region "Language"

            language: this.languageSettings(),
           
            //#endregion "Language"
        }
    }

    languageSettings(): DataTables.LanguageSettings {
        return {
            emptyTable: 'Sin datos',
            info: 'Mostrando _START_ a  _END_ de _TOTAL_ registros',
            infoEmpty: 'Sin datos encontrados',
            infoFiltered: '',
            infoPostFix: '',
            decimal: ',',
            thousands: '.',
            lengthMenu: 'Mostrando _MENU_ registros',
            loadingRecords: 'Cargando',
            processing: 'Procesando',
            search: 'Buscar',
            searchPlaceholder:'',
            zeroRecords: 'Datos no encontrados',
            paginate: this.languagePagination(),
            aria: this.languageAria(),
            url: ''
        }
    }

    languagePagination(): DataTables.LanguagePaginateSettings {
        return {
            first: 'Primera',
            last: 'Última',
            next: 'Siguiente',
            previous: 'Anterior'
        }
    }

    languageAria(): DataTables.LanguageAriaSettings {
        return {
            sortAscending: 'Asc',
            sortDescending: 'Desc',
            paginate: this.languagePagination()
        }
    }


}