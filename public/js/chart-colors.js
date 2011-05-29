Ext.namespace('Chart');
Chart.colors = {
  "AAUTO AID Given":                 "rgb(247, 150, 103)",
  "Alarm-Fire / Co Detector":        "rgb(244, 122, 75)",
  "Bike/Motorcycle accident":        "rgb(242, 93, 69)",
  "Bomb Threat":                     "rgb(210, 31, 47)",
  "C3ECHO":                          "rgb(209, 28, 89)",
  "Code 2 Medical":                  "rgb(237, 0, 136)",
  "Fire-Structure-Residential":      "rgb(131, 56, 133)",
  "Fire-Structure-Commercial":       "rgb(126, 102, 157)",
  "Fire-Structure-High Rise":        "rgb(128, 160, 207)",
  "Fire-Couch":                      "rgb(91, 179, 223)",
  "Fire-Reported Out":               "rgb(0, 175, 233)",
  "Fire-Trash/Dumpster/etc-Away":    "rgb(0, 156, 211)",
  "Fire-Trash/Dumpster/near Bldg":   "rgb(1, 113, 153)",
  "Gas Leak Inside":                 "rgb(0, 173, 176)",
  "Gas Leak Outside":                "rgb(52, 144, 123)",
  "HazMat 1 Eng":                    "rgb(50, 143, 72)",
  "HazMat Full Response":            "rgb(73, 107, 44)",
  "Illegal Burn, Smoke Check":       "rgb(115, 118, 40)",
  "Lines down/Wires Arcing":         "rgb(187, 165, 53)",
  "Medical Emergency":               "rgb(255, 216, 124)",
  "Mutual Aid - Other out of coun":  "rgb(243, 235, 8)",
  "Public Assist - All":             "rgb(253, 192, 131)",
  "Rescue - Ocean/Surf":             "rgb(223, 181, 91)",
  "Single Engine Response - Defau":  "rgb(233, 138, 0)",
  "Test Call":                       "rgb(211, 128, 0)",
  "Vegetation Fire":                 "rgb(176, 64, 0)",
  "Vehicle Acc - Code2":             "rgb(144, 63, 52)",
  "Vehicle Acc - Code3":             "rgb(143, 50, 89)",
  "Vehicle Accident Over the Side":  "rgb(100, 44, 107)",
  "Vehicle Fire - Commercial -Bus":  "rgb(70, 40, 118)",
  "Vehicle Fire - Passenger Car":    "rgb(78, 53, 187)",
  "WALKIN":                          "rgb(131, 124, 255)"
};

Chart.getColorForType = function (type) {
  type = type.replace(/\s{2,}/, "").trim();
  return Chart.colors[type] !== undefined ? Chart.colors[type] : "#000";
};
