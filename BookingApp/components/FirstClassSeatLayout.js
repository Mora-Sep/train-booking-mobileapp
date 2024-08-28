import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const FirstClassSeatLayout = ({ seats, onSeatSelect, selectedSeats, currentCart, onNextCart, onPrevCart }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.button, currentCart === 1 && styles.disabledButton]}
                    onPress={onPrevCart}
                    disabled={currentCart === 1}
                >
                    <Text style={styles.buttonText}>Previous Cart</Text>
                </TouchableOpacity>
                <Text style={styles.cartText}>First Class - Cart {currentCart}</Text>
                <TouchableOpacity
                    style={[styles.button, currentCart === seats.length && styles.disabledButton]}
                    onPress={onNextCart}
                    disabled={currentCart === seats.length}
                >
                    <Text style={styles.buttonText}>Next Cart</Text>
                </TouchableOpacity>
            </View>


            <View>
                <View style={styles.grid}>
                    {seats[currentCart - 1].seats.map((seat, index) => (
                        <React.Fragment key={index}>
                            {index % 4 === 2 && <View style={styles.emptySpace} />}
                            <TouchableOpacity
                                style={[
                                    styles.seat,
                                    seat.status === 1 && styles.unavailableSeat,
                                    selectedSeats.some(s => s.cart === currentCart && s.number === seat.number) && styles.selectedSeat
                                ]}
                                onPress={() => seat.status !== 1 && onSeatSelect(seat, currentCart)}
                                disabled={seat.status === 1}
                            >
                                <Icon name={seat.status === 1 ? 'square' : 'square-o'} size={20} />
                                <Text style={styles.seatNumber}>{seat.number}</Text>
                            </TouchableOpacity>
                        </React.Fragment>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#1E3A8A',
        borderRadius: 8,
    },
    disabledButton: {
        backgroundColor: '#A5B4FC',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    cartText: {
        textAlign: 'center',
        fontSize: 18,
        flex: 1,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center',
    },
    emptySpace: {
        width: 50,
        height: 50,
    },
    seat: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#000000',
    },
    unavailableSeat: {
        backgroundColor: '#D1D5DB',
        borderColor: '#9CA3AF',
    },
    selectedSeat: {
        backgroundColor: '#3B82F6',
    },
    seatNumber: {
        marginTop: 4,
        fontSize: 14,
    },
});

export default FirstClassSeatLayout;
