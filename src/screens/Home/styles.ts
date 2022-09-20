import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 48
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
  },
  buttonConfiguration: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 20,
    marginTop: 50,
    right: 20
  }
});