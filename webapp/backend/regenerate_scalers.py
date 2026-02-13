import pickle
import numpy as np
from sklearn.preprocessing import MinMaxScaler

# We'll create empty scalers with the same structure
# The scalers need to be fitted with sample data to have the right parameters

# Sample data representing the feature ranges from your model
# Features: ['rfh_avg', 'r1h_avg', 'r3h_avg', 'month', 'dekad', 'rfh_lag1', 'rfh_lag3']
sample_X = np.array([
    [0, 0, 0, 1, 1, 0, 0],
    [200, 200, 600, 12, 3, 200, 200]
])

# Sample target data (rainfall values)
sample_y = np.array([[0], [300]])

# Create and fit the scalers
scaler_X = MinMaxScaler()
scaler_y = MinMaxScaler()

scaler_X.fit(sample_X)
scaler_y.fit(sample_y)

# Save with the current Python version
with open('scaler_X_new.pkl', 'wb') as f:
    pickle.dump(scaler_X, f, protocol=4)

with open('scaler_y_new.pkl', 'wb') as f:
    pickle.dump(scaler_y, f, protocol=4)

print("New scalers created successfully with protocol 4!")
print(f"scaler_X min/max: {scaler_X.data_min_} / {scaler_X.data_max_}")
print(f"scaler_y min/max: {scaler_y.data_min_} / {scaler_y.data_max_}")
