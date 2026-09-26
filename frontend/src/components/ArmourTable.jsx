import * as armourData from '../data/equipment/armour.json'

console.dir(armourData);
function ArmourTable(){

    console.dir(armourData);
    const DisplayData=armourData.default.map(
        (item)=>{
            return(
                <tr>
                    <td>{item.location}</td>
                    <td>{item.material}</td>
                    <td>{item.section}</td>
                    <td>{item.hit_location}</td>
                    <td>{item.absorbs}</td>
                    <td>{item.cost}</td>
                    <td>{item.move_quietly}</td>
                    <td>{item.enc}</td>
                    <td>{item.under_armour}</td>
                    <td>{item.hide_penalty}</td>
                    <td>{item.misc}</td>
                </tr>
            )
        }
    )

    return(
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Location</th>
                    <th>Section</th>
                    <th>Hit Location</th>
                    <th>Absorbs</th>
                    <th>Cost</th>
                    <th>Move Quietly</th>
                    <th>Enc</th>
                    <th>Under Armour</th>
                    <th>Hide Penalty</th>
                    <th>Misc</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    )
 }

 export default ArmourTable;