import mergeAdverseEvents from './mergeData/adverseEvents';
import adverseEventsSchema from './schema/adverse-events';

import mergeMedicalSigns from './mergeData/medicalSigns';
import medicalSignsSchema from './schema/medical-signs';

export default function mergeData() {
    // Define analysis adverse events dataset.
    if (this.data.some(dataset => dataset.spec === 'ae')) {
        const adverseEvents = {
            spec: 'adverse-events',
            data: mergeAdverseEvents.call(
                this,
                this.data.find(dataset => dataset.spec === 'dm'),
                this.data.find(dataset => dataset.spec === 'ae')
            ),
            'Data Standard': 'Analysis'
        };
        adverseEvents.variables = Object.keys(adverseEvents.data[0]);
        adverseEvents.schema = adverseEventsSchema;
        this.data.push(adverseEvents);
    }

    // Define analysis medical signs dataset.
    if (this.data.some(dataset => dataset.spec === 'bds')) {
        const medicalSigns = {
            spec: 'medical-signs',
            data: mergeMedicalSigns.call(
                this,
                this.data.find(dataset => dataset.spec === 'dm'),
                this.data.filter(dataset => dataset.spec === 'bds')
            ),
            'Data Standard': 'Analysis'
        };

        medicalSigns.variables = Object.keys(medicalSigns.data[0]);
        medicalSigns.schema = medicalSignsSchema;

        this.data.push(medicalSigns);
    }
}
