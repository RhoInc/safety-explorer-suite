import adverseEvents from './mergeData/adverseEvents';
import medicalSigns from './mergeData/medicalSigns';

export default function mergeData() {
    if (this.dataArray.some(data => data.type === 'AE'))
        this.dataArray.push(
            {
                type: 'AEs',
                raw: adverseEvents(
                    this.dataArray.find(data => data.type === 'DM'),
                    this.dataArray.find(data => data.type === 'AE')
                )
            }
        );
    if (this.dataArray.some(data => data.type === 'BDS'))
        this.dataArray.push(
            {
                type: 'Labs',
                raw: medicalSigns(
                    this.dataArray.find(data => data.type === 'DM'),
                    this.dataArray.filter(data => data.type === 'BDS')
                )
            }
        );
}
