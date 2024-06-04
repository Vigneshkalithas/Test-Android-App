import { View, StyleSheet, Pressable, Modal, TouchableWithoutFeedback , Animated ,StatusBar , Text} from 'react-native';
import { AnimatePresence, MotiView } from 'moti';
import { useState , useLayoutEffect } from 'react';
import { COLORS, FONT, ICONS, SIZES } from '../Constants';
import { heightPixel, widthPixel } from '../styles/Responsive';
import { useNavigation } from '@react-navigation/native';

export default function ActionMenu() {
  const [expanded, setExpanded] = useState(false);
   
  return (
    <>
      <Pressable
        onPress={() => setExpanded(!expanded)}
        style={[
          styles.button,
          {
            // backgroundColor: expanded ? '#2F4EB2' : '#10243E',
            backgroundColor: expanded ?  COLORS.white : COLORS.primary
            // borderColor: '#2F4EB2',
          },
        ]}
      >
        <MotiView
          style={{ position: 'absolute' }}
          animate={{ scale: expanded ? 1.5 : 1 }}
          transition={{
            duration: 60,
            type: 'timing',
          }}
        >
        
          {expanded ? <ICONS.FloatBtnClose/> : <ICONS.PlusIcon/>}
        </MotiView>
      </Pressable>
      {/* <AnimatePresence>
        {expanded && (
          <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            {actions.map((action, i) => (
              <ActionButton key={i.toString()} action={action} index={i} />
            ))}
          </View>
        )}
      </AnimatePresence> */}
       <Modal 
       visible={expanded} 
       transparent={true} 
       animationType="fade"
      onRequestClose={() => setExpanded(!expanded)}
       >
        <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.menuContainer}>
          {/* Button inside modal */}
          <Pressable
            onPress={() => {setExpanded(!expanded)
            
            }}
            style={[
              styles.button,
              {
                backgroundColor: COLORS.white
              },
            ]}
          >
            <MotiView
              style={{ position: 'absolute' }}
              animate={{ scale: expanded ? 1.5 : 1 }}
              transition={{
                duration: 60,
                type: 'timing',
              }}
            >
              {expanded ? <ICONS.FloatBtnClose/> : <ICONS.PlusIcon/>}
            </MotiView>
          </Pressable>
          <AnimatePresence>
            {expanded && (
              <View style={{ position: 'absolute', bottom: 0, right: 0 ,  }}>
                {actions.map((action, i) => {
                return(
                  <ActionButton key={i.toString()} action={action} index={i} expanded={expanded} setExpanded={setExpanded}/>
                  )})}
              </View>
            )}
          </AnimatePresence>
        </View>
         {/* {expanded && <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent />} */}
         {expanded && <StatusBar animated={true} backgroundColor="rgba(0, 0, 0, 0.5)" barStyle="dark-content" translucent={true} />}
         {/* {expanded && <View style={styles.safeArea} />} */}
      </Modal>
    </>
  );
}

function ActionButton({ action,index,expanded,setExpanded}) {
const navigation = useNavigation()
  return (
    <MotiView
       
      transition={{ delay: index * 30, damping: 15, mass: 1 }}
      from={{
        opacity: 0,
        translateY: 0,
      }}
      animate={{
        opacity: 1,
        translateY: -65 * (index + 1),
      }}
      exit={{
        opacity: 0,
        translateY: 0,
      }}
    >
      <Pressable
        onPress={() =>{
        navigation.navigate(action.navKey)
        setExpanded(!expanded)
        }}
        style={[
          styles.button,
          {
            backgroundColor: action.color,
            width:widthPixel(43),
            height:heightPixel(43),
            borderRadius:10,
            right:widthPixel(25),
            bottom:heightPixel(140),
            flexDirection:'row'
            // shadowColor: action.color,
            // borderColor: action.border,
          },
        ]}
      >
       <Text style={[styles.floatBtntext]}>{action.type}</Text>
       <View>
        {action.icon}
       </View>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
  zIndex:1
    // flex: 1,
    // justifyContent: 'center',
    // backgroundColor: '#111',
    // padding: 8,
  },
  button: {
    borderRadius: 14,
    width: widthPixel(55),
    height: heightPixel(55),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: heightPixel(130),
    right: 17,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 1,
    // borderWidth: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
  },
  menuContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  safeArea: {
    // flex: 1,
   position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',// Adjust the color as needed
  },
  floatBtntext: {
    fontSize: SIZES.size14,
    fontFamily: FONT.EuclidSemiBold,
    color: COLORS.white,
    position:'absolute', 
    right:widthPixel(70)
  },
});

const actions = [
  {
    type: 'New Procurement',
    navKey:"NewProcurement",
    color: COLORS.white,
    emoji: '🌊',
    border: '#7F2315',
    icon:<ICONS.NewProcurementFloat/>
  },
  {
    type: 'Edit Procurement',
    navKey:"EditProcurement",
    color: COLORS.white,
    emoji: '📸',
    border: '#2F6E3B',
    icon:<ICONS.EditFloatbtn/>
  },
   {
    type: 'Add Competitors',
    navKey:"CreateCompatitors",
    color: COLORS.white,
    emoji: '👨🏻‍🚒',
    border: '#692D6F',
    icon:<ICONS.AddCompetitors/>
  },
  {
    type: 'Off Beat',
    navKey:"OffBeatS",
    color: COLORS.white,
    emoji: '🌊',
    border: '#7F2315',
    icon:<ICONS.OffbeatIcon/>
  },
  
];




{/* <Pressable
              style={styles.offBeat}
              onPress={() => navigation.navigate("Sample1")}
            >
              <ICONS.OffbeatIcon />
            </Pressable>
            <Pressable
              style={styles.offBeat}
              onPress={() => PageNavigation("EditProcurement")}
            >
              <ICONS.AddCompetitors />
            </Pressable>
            <Pressable
              style={styles.offBeat}
              onPress={() => PageNavigation("EditProcurement")}
            >
              <ICONS.EditFloatbtn />
            </Pressable>
            <Pressable
              style={styles.NewProcurement}
              onPress={() => PageNavigation("NewProcurement")}
            >
              <ICONS.NewProcurementFloat />
            </Pressable>
            <Pressable
              style={styles.NewProcurement}
              onPress={() => setFloatButton(false)}
            >
              <ICONS.FloatBtnClose />
            </Pressable> */}