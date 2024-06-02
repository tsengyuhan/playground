---
title: "Modular PCB for Haptic Control"
#date: 2024-01-01
date: 2007-01-01
type: works
image: "images/works/pcb/pcb-hero2.jpg"
category: ["PCB design"]
draft: false
---

#### A programmable platform with modular PCBs for controlling haptic actuators

</br></br>
{{< postimg url = "pcb/all-pcb.jpg" alt ="pcb module" imgw ="100%" >}}
</br>

We aim to develop a haptic wearable platform with open APIs to allow users to design their own thermal and haptic experiences. These are modular PCBs for power supply, peltier control, heater pad control, vibration motor control, and thermistor reading. Users can use different amounts and combinations of them to do further applications.

</br></br></br>

#### Background

I participated in a [project](https://emil-xr.eu/lighthouse-projects/aalto-smart-garments/) in the [Wearable Systems Lab](https://www.aalto.fi/en/wearable-systems-lab) led by [Prof. Xiao](https://research.aalto.fi/en/persons/yu-xiao). The purpose is to develop a thermal and haptic control platform for extended reality (XR) applications, one interesting example is the VR Sauna. This is an ongoing project, my role was to design and prototype the hardware part of this platform, focusing on the printed circuit board (PCB) design and the circuit design of the whole system. The goal was to allow users to easily arrange and control the required actuators with these PCBs.

{{< postimg url = "pcb/garment_idea.png" alt ="example idea" imgw ="80%" >}}
<p style="text-align: center; margin-top: 5px">Initial idea about using different actuators with the textile design to create virual sauna experience.</p>
</br></br></br>


#### Design Goals

In terms of hardware design, there are some aspects are considered as follows:

##### Modularity

The usage of PCB is to simplify and compass the control circuit, allowing users to connect the required actuators and sensors effortlessly. Therefore, I tried to make the PCBs of this system as modules, working with less soldering and wiring manually.

##### Extensibility

We hope the user can use this platform for various purposes and applications, so building on their modularity, they can extend the system by connecting multiple slave board modules with one power module and one master board.

##### Wearability

We focus on the XR application and the system is about haptics, the actuators and sensors are usually attached to a user's body. Therefore, we also consider how to apply these PCBs more easily, reliably, and comfortably to the textile design.

##### Size

In conclusion the above key points, a smaller size of the module is more handy and more suitable, so I tried to reduce the size of the PCB as much as possible.

</br></br></br>


#### Design Process

The hardware design of this system includes the power supply, a master board for transmitting control comments from the computer, and multiple slave modules for controlling actuators and sensors (the PCB modules). We used [I2C communication](https://en.wikipedia.org/wiki/I%C2%B2C) between the master board and the slave modules, and serieal communication or WiFi between the VR system and the master board.

To develop the system and meet the requirements mentioned above, the system has gone through three main versions and multiple minor iterations:
</br>

The first version connected modules one by one in a series. Because the connectors and required signals were the same, the slave module could be the peltier control module, heater pad module, motor control module, etc. However, transmitting the power from one module to another module was inefficient. With more modules connected to the system, a higher current went through each board, making the circuit unstable.
{{< postimg url = "pcb/v1_system.png" alt ="system design v.1" imgw ="100%" >}}
</br>

In the second version, I designed a Main power module to solve the power issue of the first version. One main power module could connect up to five slave modules. It could also connect to another main power module if more actuators and sensors were required. There were some advantages:

- Avoiding large power with high current going through a slave module.
- Move the power regulating part from the slave module to the Main power module, so the slave module decreases in size and uses the power more efficiently.
- Each Main power module could connect to a power supply, which was safer and more convenient when using many actuators and dispersed in a larger area.
  
{{< postimg url = "pcb/v2_system.png" alt ="system design v.2" imgw ="100%" >}}

However, this version was inconvenient to integrate into textile design due to the shape and size of the Main power module. Therefore, I focused on the integration between the electronic parts and the textile in the next optimization, which came up as the third version and also the latest version (see outcome).
</br>

About prototyping, I use [KiCad](https://www.kicad.org/) for PCB design and an [SRM-20 milling machine](https://www.rolanddga.com/products/3d/srm-20-small-milling-machine) for producing copper board, and then soldering components.

{{< postimg url = "pcb/pcb_iteration.png" alt ="pcb prototypes" imgw ="80%" >}}
<p style="text-align: center; margin-top: 5px">Some PCB prototypes before sending the design to the manufacturer. We also tried flexible PCB but didn't succeed.</p>

</br></br></br>



#### Outcome 1: The system deasign

The latest version kept the design of the Main power module but changed the power and I2C connectors to edge-connector pins with holes. The users could extend the connection points using various conductive materials, such as copper wires, conductive yarn, and conductive fabric. This improvement offers users more flexibility in terms of the number and arrangement of connected modules, especially with textiles.

{{< postimg url = "pcb/v3_system.png" alt ="system design v.3" imgw ="100%" >}}
</br></br>

{{< postimg url = "pcb/example_fabric2.jpeg" alt ="system prototype" imgw ="80%" >}}
<p style="text-align: center; margin-top: 5px">Prototype and testing of the system.</p>

{{< postimg url = "pcb/example_fabric.png" alt ="system prototype" imgw ="100%" >}}
<p style="text-align: center; margin-top: 5px">Prototype and testing with different fabrics.</p>


</br></br></br>

#### Outcome 2: PCB modules

The slave modules were designed with various non-soldering connectors to allow users to connect the actuators and sensors more easily. Currently, the system includes five types of modules: Main power module, peltier module, motor module, heater module, and thermistor module. Except for the power module, each module incorporates either an [ATtiny412](https://www.microchip.com/en-us/product/attiny412) or [ATtiny1614](https://www.microchip.com/en-us/product/attiny1614) microcontroller which offers I2C communication and an optimal pin count at a low cost. Each module was pre-programmed and could be managed via the provided API. Additionally, slave modules featured a programming pin, enabling users to independently program modules using the Unified Program and Debug Interface (UPDI).

- [Open-source control API and PCB design files](https://version.aalto.fi/gitlab/vikbere2/wearable-device-api)(The software engineer designed the control API and I made PCBs.)
</br></br>

##### Main power module

The main power module is responsible for distributing power and transmitting I2C signals to each slave module.
{{< postimg url = "pcb/power_module.png" alt ="main power module" imgw ="80%" >}}

- Input voltage: 6.2 V ~ 20 V
- Regulate input voltage to 5V as the logic power for the master board abd slave modules.
- A physical power switch and an enable pin for turning power ON/OFF by programming.
</br></br>

##### Peltier module

The Peltier module allows users to control Peltier cells.
{{< postimg url = "pcb/peltier_module.png" alt ="peltier module" imgw ="80%" >}}

- Input voltage: 6.2 V ~ 20 V (Max. current: 7 A)
- Control up to 2 peltier cells for heating/cooling.
- Adjustable intensity via Pulse-Width Modulation (PWM).
- Read the data of up to 4 thermistors (10k).
</br></br>

##### Vibration motor module

The motor module allows users to control DC motors.
{{< postimg url = "pcb/motor_module.png" alt ="vibration motor module" imgw ="80%" >}}

- Input voltage: 5V (Max. current: 1.7 A)
- Control up to 2 DC motors.
- Adjustable the vibrating intensity via PWM.
</br></br>

##### Heater module

The heater module allows users to control heating elements through DC power.
{{< postimg url = "pcb/heater_module.png" alt ="heater module" imgw ="80%" >}}

- Input voltage: 6.2 V ~ 20 V (Max. current: 32 A)
- Control up to 2 heating elements.
- Adjustable heating intensity via PWM.
- Read the data of up to 2 thermistors (10k). One thermistor connects with one heating element.
</br></br>

##### Thermistor module

The thermistor module allows users to measure the temperature data from the thermistors.
{{< postimg url = "pcb/sensor_module.png" alt ="thermistor module" imgw ="80%" >}}

- Input voltage: 5V.
- Read the data from up to three thermistors.
</br></br></br>

##### Work Distribution

This project was led by Prof. Xiao. I was a team member when studying at Aalto University. I mainly worked with a designer, software engineer, and textile designer. My job focused on **hardware design and circuit integration**.

The project is under development and this system still needs further improvement and optimization, such as flattening the connectors, stabilizing the circuit when combined with the fabric, and wiring safely and organizedly on a textile design.

</br></br></br>

