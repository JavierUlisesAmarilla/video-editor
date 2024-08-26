/* eslint-disable @typescript-eslint/no-explicit-any */
import GSTC from "gantt-schedule-timeline-calendar"
import "gantt-schedule-timeline-calendar/dist/style.css"
import {useEffect, useRef} from "react"

const rowsFromDB = [
  {
    id: "1",
    label: "Row 1",
  },
  {
    id: "2",
    label: "Row 2",
  },
]

const itemsFromDB = [
  {
    id: "1",
    label: "Item 1",
    rowId: "1",
    time: {
      start: GSTC.api.date("2020-01-01").startOf("day").valueOf(),
      end: GSTC.api.date("2020-01-02").endOf("day").valueOf(),
    },
  },
  {
    id: "2",
    label: "Item 2",
    rowId: "1",
    time: {
      start: GSTC.api.date("2020-02-01").startOf("day").valueOf(),
      end: GSTC.api.date("2020-02-02").endOf("day").valueOf(),
    },
  },
  {
    id: "3",
    label: "Item 3",
    rowId: "2",
    time: {
      start: GSTC.api.date("2020-01-15").startOf("day").valueOf(),
      end: GSTC.api.date("2020-01-20").endOf("day").valueOf(),
    },
  },
]

const columnsFromDB = [
  {
    id: "id",
    data: ({ row }: { row: any }) => GSTC.api.sourceID(row.id), // Show original id (not internal GSTCID)
    sortable: ({ row }: { row: any }) => Number(GSTC.api.sourceID(row.id)), // Sort by id converted to number
    width: 80,
    header: {
      content: "ID",
    },
  },
  {
    id: "label",
    data: "label",
    sortable: "label",
    isHTML: false,
    width: 230,
    header: {
      content: "Label",
    },
  },
]

const config = {
  // For free key for your domain please visit https://gstc.neuronet.io/free-key
  // If you need commercial license please visit https://gantt-schedule-timeline-calendar.neuronet.io/pricing
  licenseKey:
    "====BEGIN LICENSE KEY====\njufz94vAPQeEqTFkMC4gNwv+WXtg7EamfNlR4JlwhGPdwSkUF0UoPfeKd8ooJryU/Q+PyLCG7h++El7VWiJ2C3ifcfpsQd5aqBqNMu0WlPykJ1Lj4ID+4wPIp0p4Kv/uGbcIcZEGoALOSZcp6+pgo8IraWiRU8iGgtPDnJekMU13a19nU75EtjzkMldgZwplztYNH12kvXXm7fLBVDacDSSyQIRQ2qeMHF7Fs3AAkCvEsSkHXG0sdmBtlAW2zARmP5PsLYtz0sPGbWbw2fW5ArRst6dkyK1UexNYUW2DNdKrBannnEaNa4dLxWG3InSD0skm9Gg5ivkHWJnLWuukAw==||U2FsdGVkX18esqWkSRieYJn+3SMAtLf3zQ0W2ks0DNLg0zI6USpERjxBYnIZv9zlVlyx45Du+X8X+eIKs+a3QUlZUChBLqkHWvaPzRP85KE=\nU6MlXCEyjafsl165FyGA579oOchAjnZPhh7pD40FaMxU+mvmi+ynRLAIX2KuTCgfmA1RIhqmo08cPHJlnaeRAtmIwf6ai/jJ43iELtC6WoOacNGowDamGfxqSiylu12bQskLY3wO4mjjWmCNFDlCjLsZ3KjJM4MZz0aytVap4LuI9O0I79CPxVIeudJufhoalsHzAfM52qy4RAV84vO4nQdj2bcISCvXlXnowAT5VXSXuq08ChcMoRgQzh5QlCYBV41GGKavzFcpVGwKzTVdPXdLBVwrNyvCbz2WPY5X4RuW9jFFYT1fEYt49TRGZa8ng9vTEp88nOQWUovpJP+y3Q==\n====END LICENSE KEY====",
  list: {
    columns: {
      data: GSTC.api.fromArray(columnsFromDB),
    },
    rows: GSTC.api.fromArray(rowsFromDB),
  },
  chart: {
    items: GSTC.api.fromArray(itemsFromDB),
  },
}

export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    // Generate GSTC state from configuration object
    const state = GSTC.api.stateFromConfig(config)

    // Create an instance and mount the component
    GSTC({
      element: ref.current,
      state,
    })
  }, [])

  return <div ref={ref} className="w-full h-full overflow-auto"/>
}
