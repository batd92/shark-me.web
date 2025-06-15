import React, { useState } from 'react';
import {
  Box,
  RadioCards,
  Flex,
  Text,
  Grid,
  TextField,
  Button,
  Badge,
  DataList,
  Heading,
  Link
} from "@radix-ui/themes";
import { useRouter } from 'next/navigation';
import { ChainId } from '@/lib/config/chainId';
import { useAccount } from 'wagmi';
import { useStakingUser } from '@/lib/services/blockchains/staking';
import { getAddressForChain } from '@/lib/config/addresses';

const Staking: React.FC = () => {
  const router = useRouter();
  const { address } = useAccount();
  const contractAddress = getAddressForChain(ChainId.SEPOLIA).STAKING;
  const {
    STAKING_PACKAGES: packages,
    stake,
    withdraw,
    claim,
    useAllUserStakes,
    usePackageEnabled,
    useMinStakeAmount,
    useTotalLocked,
    status,
    error
  } = useStakingUser(contractAddress);

  const totalLockedQuery = useTotalLocked();
  const minStakeQuery = useMinStakeAmount();
  const packageStatuses = packages.map(p => ({
    ...p,
    enabledQuery: usePackageEnabled(p.packageId)
  }));
  const allStakesQueries = address ? useAllUserStakes(address) : [];

  const [selectedPackageId, setSelectedPackageId] = useState(packages[0].packageId);
  const [amount, setAmount] = useState<string>('');

  const selectedPackage = packages.find(p => p.packageId === selectedPackageId)!;

  return (
    <div className="space-y-8 p-6">
      <Box>
        <Heading size="4" style={{ paddingBottom: '20px' }}>
          <Link onClick={() => router.back()} size="5">Home</Link> / Staking
        </Heading>
      </Box>

      <Box style={{ justifyContent: 'center', alignItems: "center" }}>
        <RadioCards.Root
          columns={{ initial: "1", sm: "3" }}
          gap="6"
          style={{ textAlign: 'center' }}
        >
          <RadioCards.Item value="totalLocked" disabled>
            <Flex direction="column" width="100%" align="start">
              <Text weight="bold" color="orange">{`$ ${(totalLockedQuery.data !== undefined && totalLockedQuery.data !== null) ? totalLockedQuery.data : 0}`}</Text>
              <Text>Total Value Locked</Text>
            </Flex>
          </RadioCards.Item>
          {selectedPackage.apyBasisPoints !== null && selectedPackage.apyBasisPoints !== undefined ? (
            <RadioCards.Item value="apy" disabled>
              <Flex direction="column" width="100%" align="start">
                <Text weight="bold" color="orange">{selectedPackage.apyBasisPoints / 100}%</Text>
                <Text>APY Rate</Text>
              </Flex>
            </RadioCards.Item>
          ) : null}
          <RadioCards.Item value="stakers" disabled>
            <Flex direction="column" width="100%" align="start">
              <Text weight="bold" color="orange">{allStakesQueries.reduce((sum, q) => sum + (Array.isArray(q.data) ? q.data.length : 0), 0)}</Text>
              <Text>Number of Stakers</Text>
            </Flex>
          </RadioCards.Item>
        </RadioCards.Root>
      </Box>

      <Heading as="h6" style={{ paddingBottom: '20px' }}>Participate IDO Stack</Heading>

      <Grid columns={{ initial: "1", md: "3" }} gap="6" width="100%">
        <Box style={{ gridColumn: "span 2" }}>
          <RadioCards.Root
            defaultValue={selectedPackageId.toString()}
            columns={{ initial: "1", sm: "3" }}
            gap="4"
            onValueChange={val => setSelectedPackageId(Number(val))}
            value={selectedPackageId.toString()}
          >
            {packages.map(pkg => (
              <RadioCards.Item key={pkg.packageId} value={pkg.packageId.toString()} disabled={false}>
                <Flex direction="column" width="100%" align="start">
                  <Text weight="bold">{pkg.durationSeconds / (24*3600)} days</Text>
                  <Text>APY Rate: {pkg.apyBasisPoints / 100}%</Text>
                </Flex>
              </RadioCards.Item>
            ))}
          </RadioCards.Root>

          <DataList.Root style={{ paddingTop: '40px' }} orientation={{ initial: "vertical", sm: "horizontal" }}>
            <DataList.Item>
              <DataList.Label minWidth="120px">Lock Period:</DataList.Label>
              <DataList.Value>{selectedPackage.durationSeconds / (24 * 3600)} days</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="120px">Re-locks on registration:</DataList.Label>
              <DataList.Value>Yes</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="120px">Early unstake fee:</DataList.Label>
              <DataList.Value>{selectedPackage.apyBasisPoints / 100}%</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="120px">Status:</DataList.Label>
              <DataList.Value>{packageStatuses.find(p=>p.packageId===selectedPackageId)!.enabledQuery.data ? 'Enabled' : 'Disabled'}</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Box>

        <Box style={{ gridColumn: "span 1" }}>
          <Flex direction="column" gap="4">
            <Box>
              <Badge color="orange" style={{ height: '30px', marginBottom: '10px' }}>
                Amount (min {(typeof minStakeQuery.data === 'number' ? minStakeQuery.data : 0)}):
              </Badge>
              <TextField.Root
                size="3"
                placeholder="Number ..."
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{ width: '100%' }}
              >
                <TextField.Slot side="right" px="1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button size="2" onClick={() => stake(amount, selectedPackageId)}>Stake</Button>
                </TextField.Slot>
              </TextField.Root>
            </Box>

            <Box style={{ marginTop: '30px' }}>
              <Badge color="orange" style={{ height: '30px', marginBottom: '10px' }}>
                Your Stakes: {
                  (() => {
                    const stakeQuery = allStakesQueries.find(q => q.packageId === selectedPackageId);
                    const data = stakeQuery?.data;
                    return Array.isArray(data) ? data.length : 0;
                  })()
                }
              </Badge>
              <TextField.Root
                size="3"
                placeholder="Stake ID"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{ width: '100%' }}
              >
                <TextField.Slot side="right" px="1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button size="2" onClick={() => withdraw(selectedPackageId, Number(amount))}>Withdraw</Button>
                </TextField.Slot>
              </TextField.Root>
            </Box>
          </Flex>
        </Box>
      </Grid>
    </div>
  );
};

export default Staking;
